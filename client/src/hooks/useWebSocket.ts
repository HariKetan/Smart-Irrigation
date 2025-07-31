import { useEffect, useRef, useState, useCallback } from 'react'

interface WebSocketMessage {
  type: string
  data: any
  timestamp: string
}

interface UseWebSocketOptions {
  url?: string
  onMessage?: (message: WebSocketMessage) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Event) => void
  autoReconnect?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

export function useWebSocket({
  url = 'ws://localhost:5000',
  onMessage,
  onConnect,
  onDisconnect,
  onError,
  autoReconnect = true,
  reconnectInterval = 5000,
  maxReconnectAttempts = 5
}: UseWebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
        setError(null)
        reconnectAttemptsRef.current = 0
        onConnect?.()
        console.log('🔌 WebSocket connected successfully')
      }

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          console.log('📨 WebSocket message received:', message)
          onMessage?.(message)
        } catch (err) {
          console.error('❌ Failed to parse WebSocket message:', err)
        }
      }

      ws.onclose = (event) => {
        setIsConnected(false)
        onDisconnect?.()
        console.log('🔌 WebSocket disconnected:', event.code, event.reason)

        if (autoReconnect && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++
          console.log(`🔄 Reconnecting... Attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts}`)
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, reconnectInterval)
        }
      }

      ws.onerror = (event) => {
        setError('WebSocket error occurred')
        onError?.(event)
        console.error('❌ WebSocket error:', event)
      }
    } catch (err) {
      setError('Failed to create WebSocket connection')
      console.error('Failed to create WebSocket:', err)
    }
  }, [url, onMessage, onConnect, onDisconnect, onError, autoReconnect, reconnectInterval, maxReconnectAttempts])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    
    setIsConnected(false)
    reconnectAttemptsRef.current = 0
  }, [])

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket is not connected')
    }
  }, [])

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    isConnected,
    error,
    sendMessage,
    connect,
    disconnect
  }
} 