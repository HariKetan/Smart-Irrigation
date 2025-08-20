import { useEffect, useRef, useState, useCallback } from "react";
import { apiConfig } from "@/lib/config";
import { APP_CONSTANTS } from "@/lib/constants";

interface WebSocketMessage {
	type: string;
	data: any;
	timestamp: string;
}

interface UseWebSocketOptions {
	url?: string;
	onMessage?: (message: WebSocketMessage) => void;
	onConnect?: () => void;
	onDisconnect?: () => void;
	onError?: (error: Event) => void;
	autoReconnect?: boolean;
	reconnectInterval?: number;
	maxReconnectAttempts?: number;
}

export function useWebSocket({
	url = apiConfig.wsUrl,
	onMessage,
	onConnect,
	onDisconnect,
	onError,
	autoReconnect = true,
	reconnectInterval = APP_CONSTANTS.DEFAULT_WS_RECONNECT_INTERVAL,
	maxReconnectAttempts = 5,
}: UseWebSocketOptions = {}) {
	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const wsRef = useRef<WebSocket | null>(null);
	const reconnectAttemptsRef = useRef(0);
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const heartbeatRef = useRef<NodeJS.Timeout | null>(null);

	// Use refs to store callback functions to prevent unnecessary re-renders
	const onMessageRef = useRef(onMessage);
	const onConnectRef = useRef(onConnect);
	const onDisconnectRef = useRef(onDisconnect);
	const onErrorRef = useRef(onError);

	// Update refs when callbacks change
	useEffect(() => {
		onMessageRef.current = onMessage;
	}, [onMessage]);

	useEffect(() => {
		onConnectRef.current = onConnect;
	}, [onConnect]);

	useEffect(() => {
		onDisconnectRef.current = onDisconnect;
	}, [onDisconnect]);

	useEffect(() => {
		onErrorRef.current = onError;
	}, [onError]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
			}
			if (heartbeatRef.current) {
				clearInterval(heartbeatRef.current);
			}
			if (wsRef.current) {
				wsRef.current.close();
			}
		};
	}, []);

	const connect = useCallback(() => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			return;
		}

		// Add a small delay to prevent rapid reconnection attempts
		if (reconnectAttemptsRef.current > 0) {
			console.log(`⏳ Waiting ${reconnectInterval}ms before reconnecting...`);
		}

		try {
			const ws = new WebSocket(url);
			wsRef.current = ws;

			ws.onopen = () => {
				setIsConnected(true);
				setError(null);
				reconnectAttemptsRef.current = 0;
				onConnectRef.current?.();
				console.log("🔌 WebSocket connected successfully");

				// Start heartbeat
				heartbeatRef.current = setInterval(() => {
					if (wsRef.current?.readyState === WebSocket.OPEN) {
						wsRef.current.send(JSON.stringify({ type: "ping" }));
					}
				}, APP_CONSTANTS.DEFAULT_WS_HEARTBEAT_INTERVAL);
			};

			ws.onmessage = (event) => {
				try {
					const message: WebSocketMessage = JSON.parse(event.data);
					console.log("📨 WebSocket message received:", message);
					onMessageRef.current?.(message);
				} catch (err) {
					console.error("❌ Failed to parse WebSocket message:", err);
				}
			};

			ws.onclose = (event) => {
				setIsConnected(false);
				onDisconnectRef.current?.();
				console.log("🔌 WebSocket disconnected:", event.code, event.reason);

				// Clear heartbeat
				if (heartbeatRef.current) {
					clearInterval(heartbeatRef.current);
					heartbeatRef.current = null;
				}

				// Don't reconnect if it was a normal closure or we've exceeded max attempts
				if (event.code === 1000) {
					console.log("🔌 Normal WebSocket closure, not reconnecting");
					return;
				}

				if (
					autoReconnect &&
					reconnectAttemptsRef.current < maxReconnectAttempts
				) {
					reconnectAttemptsRef.current++;
					console.log(
						`🔄 Reconnecting... Attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts}`
					);

					reconnectTimeoutRef.current = setTimeout(() => {
						connect();
					}, reconnectInterval);
				} else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
					console.log(
						"❌ Max reconnection attempts reached, stopping reconnection"
					);
					setError("Failed to reconnect after maximum attempts");
				}
			};

			ws.onerror = (event: Event) => {
				setError("WebSocket error occurred");
				onErrorRef.current?.(event);
				console.error("❌ WebSocket error:", event);
			};
		} catch (err) {
			setError("Failed to create WebSocket connection");
			console.error("Failed to create WebSocket:", err);
		}
	}, [url, autoReconnect, reconnectInterval, maxReconnectAttempts]);

	const disconnect = useCallback(() => {
		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current);
			reconnectTimeoutRef.current = null;
		}

		if (heartbeatRef.current) {
			clearInterval(heartbeatRef.current);
			heartbeatRef.current = null;
		}

		if (wsRef.current) {
			wsRef.current.close();
			wsRef.current = null;
		}

		setIsConnected(false);
		reconnectAttemptsRef.current = 0;
	}, []);

	const sendMessage = useCallback((message: any) => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			wsRef.current.send(JSON.stringify(message));
		} else {
			console.warn("WebSocket is not connected");
		}
	}, []);

	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, []); // Empty dependency array since we're using refs for callbacks

	return {
		isConnected,
		error,
		sendMessage,
		connect,
		disconnect,
	};
}
