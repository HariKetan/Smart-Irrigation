"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@googlemaps/js-api-loader";
import { api } from "@/lib/api";

interface Section {
	id: number;
	section_number: number;
	name: string;
	moisture?: number;
	valveOpen?: boolean;
	lastIrrigation?: string;
	location?: string;
}

interface Sensor {
	id: string;
	name: string;
	type: "MOISTURE" | "WATER_FLOW";
	value: number;
	unit: string;
	zone: string;
	status: string;
	location: string;
	lastReading: string;
	isActive: boolean;
	zoneId: number;
}

interface Valve {
	id: string;
	name: string;
	isOpen: boolean;
	flowRate: number;
	location: string;
	isActive: boolean;
	zoneId: number;
	updatedAt: string;
}

// Farm boundary coordinates (dotted box)
const farmBoundary = [
	{ lat: 12.9232764, lng: 77.5016282 }, // Top-left
	{ lat: 12.9233045, lng: 77.5019524 }, // Top-right
	{ lat: 12.9229646, lng: 77.5019806 }, // Bottom-right
	{ lat: 12.9229499, lng: 77.5016604 }, // Bottom-left
	{ lat: 12.9232764, lng: 77.5016282 }, // Back to start (close the polygon)
];

// Section polygons (4 sections inside the farm boundary)
const sectionPolygons = [
	[
		// Section 1 (top-left)
		{ lat: 12.9232764, lng: 77.5016282 },
		{ lat: 12.92329, lng: 77.50179 },
		{ lat: 12.92312, lng: 77.5018 },
		{ lat: 12.92311, lng: 77.50165 },
		{ lat: 12.9232764, lng: 77.5016282 },
	],
	[
		// Section 2 (top-right)
		{ lat: 12.92329, lng: 77.50179 },
		{ lat: 12.9233045, lng: 77.5019524 },
		{ lat: 12.92312, lng: 77.50197 },
		{ lat: 12.92312, lng: 77.5018 },
		{ lat: 12.92329, lng: 77.50179 },
	],
	[
		// Section 3 (bottom-right)
		{ lat: 12.92312, lng: 77.5018 },
		{ lat: 12.92312, lng: 77.50197 },
		{ lat: 12.9229646, lng: 77.5019806 },
		{ lat: 12.9229499, lng: 77.50182 },
		{ lat: 12.92312, lng: 77.5018 },
	],
	[
		// Section 4 (bottom-left)
		{ lat: 12.92311, lng: 77.50165 },
		{ lat: 12.92312, lng: 77.5018 },
		{ lat: 12.9229499, lng: 77.50182 },
		{ lat: 12.9229499, lng: 77.5016604 },
		{ lat: 12.92311, lng: 77.50165 },
	],
];

const sectionColors = [
	"#fbbf24", // amber-400
	"#60a5fa", // blue-400
	"#34d399", // green-400
	"#f472b6", // pink-400
];

export default function MapPage() {
	const [sensors, setSensors] = useState<Sensor[]>([]);
	const [valves, setValves] = useState<Valve[]>([]);
	const [loading, setLoading] = useState(true);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const mapRef = useRef<HTMLDivElement>(null);
	const markersRef = useRef<google.maps.Marker[]>([]);
	const polygonRef = useRef<google.maps.Polygon | null>(null);
	const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

	// Fetch real sensor and valve data
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Get sections data
				const sections = (await api.getSections()) as Section[];

				// Transform sections data to match Sensor interface (moisture sensors)
				const sensorsData = sections.map((section) => {
					// Calculate center coordinates for each section
					let centerLat, centerLng;
					switch (section.section_number) {
						case 1: // Section 1 (top-left)
							centerLat = 12.9231932; // Center of section 1
							centerLng = 77.5017092;
							break;
						case 2: // Section 2 (top-right)
							centerLat = 12.9231972;
							centerLng = 77.5018712;
							break;
						case 3: // Section 3 (bottom-right)
							centerLat = 12.9230423;
							centerLng = 77.5019003;
							break;
						case 4: // Section 4 (bottom-left)
							centerLat = 12.9230349;
							centerLng = 77.5017352;
							break;
						default:
							centerLat = 12.9231345;
							centerLng = 77.5018035;
					}

					return {
						id: `sensor-${section.section_number}`,
						name: `Section ${section.section_number}`,
						type: "MOISTURE" as const,
						value: section.moisture || 0,
						unit: "%",
						zone: section.name || `Section ${section.section_number}`,
						status: "Active",
						location: `${centerLat - 0.00001}, ${centerLng - 0.00001}`, // Position sensor slightly to the left and down
						lastReading: section.lastIrrigation || new Date().toISOString(),
						isActive: true,
						zoneId: section.section_number,
					};
				});

				// Transform sections data to match Valve interface (irrigation valves)
				const valvesData = sections.map((section) => {
					// Calculate center coordinates for each section
					let centerLat, centerLng;
					switch (section.section_number) {
						case 1: // Section 1 (top-left)
							centerLat = 12.9231932; // Center of section 1
							centerLng = 77.5017092;
							break;
						case 2: // Section 2 (top-right)
							centerLat = 12.9231972;
							centerLng = 77.5018712;
							break;
						case 3: // Section 3 (bottom-right)
							centerLat = 12.9230423;
							centerLng = 77.5019003;
							break;
						case 4: // Section 4 (bottom-left)
							centerLat = 12.9230349;
							centerLng = 77.5017352;
							break;
						default:
							centerLat = 12.9231345;
							centerLng = 77.5018035;
					}

					return {
						id: `valve-${section.section_number}`,
						name: `Valve ${section.section_number}`,
						isOpen: section.valveOpen || false,
						flowRate: 0, // Not available in current data
						location: `${centerLat + 0.00001}, ${centerLng + 0.00001}`, // Position valve slightly to the right and up
						isActive: section.valveOpen || false,
						zoneId: section.section_number,
						updatedAt: section.lastIrrigation || new Date().toISOString(),
					};
				});

				setSensors(sensorsData);
				setValves(valvesData);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const initMap = async () => {
			const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

			if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
				console.warn(
					"Google Maps API key not configured. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file"
				);
				setLoading(false);
				return;
			}

			const loader = new Loader({
				apiKey: apiKey,
				version: "weekly",
			});

			try {
				const google = await loader.load();

				if (mapRef.current) {
					const mapInstance = new google.maps.Map(mapRef.current, {
						center: { lat: 12.9231345, lng: 77.5018035 }, // Bangalore coordinates
						zoom: 20,
						mapTypeId: google.maps.MapTypeId.TERRAIN,
						mapTypeControl: true,
						streetViewControl: true, // Enable Street View
						fullscreenControl: false,
						zoomControl: true,
						disableDefaultUI: false,
						clickableIcons: false, // Prevent clicking on map POIs
					});

					setMap(mapInstance);
					infoWindowRef.current = new google.maps.InfoWindow();

					// Add Street View functionality to window object
					(window as any).showStreetView = (lat: number, lng: number) => {
						const streetViewService = new google.maps.StreetViewService();
						const streetView = new google.maps.StreetViewPanorama(
							mapRef.current!,
							{
								position: { lat, lng },
								pov: { heading: 34, pitch: 10 },
								zoom: 1,
								addressControl: false,
								showRoadLabels: false,
							}
						);

						streetViewService.getPanorama(
							{
								location: { lat, lng },
								radius: 50,
							},
							(data, status) => {
								if (status === google.maps.StreetViewStatus.OK && data) {
									streetView.setPano(data.location!.pano!);
								} else {
									// If no Street View available, show satellite view
									mapInstance.setMapTypeId(google.maps.MapTypeId.SATELLITE);
									mapInstance.setCenter({ lat, lng });
									mapInstance.setZoom(21);
								}
							}
						);
					};

					// Add farm boundary polygon (dotted box)
					const farmPolygon = new google.maps.Polygon({
						paths: farmBoundary,
						strokeColor: "#22c55e", // Green color
						strokeOpacity: 1.0,
						strokeWeight: 3,
						fillColor: "#22c55e",
						fillOpacity: 0.1, // Very light fill
						map: mapInstance,
					});

					polygonRef.current = farmPolygon;

					// Add dotted border effect using multiple polylines
					for (let i = 0; i < farmBoundary.length - 1; i++) {
						const start = farmBoundary[i];
						const end = farmBoundary[i + 1];

						// Create a polyline for each edge with dotted style
						new google.maps.Polyline({
							path: [start, end],
							strokeColor: "#22c55e",
							strokeOpacity: 1.0,
							strokeWeight: 3,
							icons: [
								{
									icon: {
										path: google.maps.SymbolPath.CIRCLE,
										scale: 2,
										fillColor: "#22c55e",
										fillOpacity: 1,
										strokeColor: "#22c55e",
										strokeWeight: 1,
									},
									offset: "0",
									repeat: "10px",
								},
							],
							map: mapInstance,
						});
					}

					// Draw section polygons and add click listeners
					sectionPolygons.forEach((polygonCoords, idx) => {
						const sectionPolygon = new google.maps.Polygon({
							paths: polygonCoords,
							strokeColor: sectionColors[idx],
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: sectionColors[idx],
							fillOpacity: 0.18,
							map: mapInstance,
							clickable: true,
							zIndex: 2,
						});
						sectionPolygon.addListener("click", () => {
							window.location.href = `/section-detail/1/${idx + 1}`; // Use farm ID 1 and section number
						});
					});
				}
			} catch (error) {
				console.error("Error loading Google Maps:", error);
			}
		};

		if (!loading) {
			initMap();
		}
	}, [loading]);

	// Add sensor markers when sensors data is loaded
	useEffect(() => {
		if (map && sensors.length > 0) {
			sensors.forEach((sensor) => {
				// Parse location string to get coordinates
				const locationParts = sensor.location.split(",");
				if (locationParts.length >= 2) {
					const lat = parseFloat(locationParts[0].trim());
					const lng = parseFloat(locationParts[1].trim());

					if (!isNaN(lat) && !isNaN(lng)) {
						const marker = new google.maps.Marker({
							position: { lat, lng },
							map: map,
							title: `${sensor.name} - ${sensor.value}% moisture`, // Hover tooltip
							icon: {
								url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="${
												sensor.isActive ? "#22c55e" : "#ef4444"
											}" stroke="white" stroke-width="2"/>
                      <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">S</text>
                    </svg>
                  `)}`,
								scaledSize: new google.maps.Size(24, 24),
							},
						});

						// Add click listener to navigate to section detail
						marker.addListener("click", () => {
							// First click: Show info window with Street View integration
							if (infoWindowRef.current) {
								infoWindowRef.current.setContent(`
									<div style="padding: 12px; min-width: 250px;">
										<h3 style="margin: 0 0 8px 0; font-weight: bold; color: #333;">${
											sensor.name
										}</h3>
										<p style="margin: 4px 0; font-size: 14px; color: #666;">Type: ${sensor.type}</p>
										<p style="margin: 4px 0; font-size: 16px; color: #333; font-weight: 600; background: #f0f9ff; padding: 8px; border-radius: 4px; border-left: 4px solid #3b82f6;">
											🌱 Moisture: ${sensor.value} ${sensor.unit}
										</p>
										<p style="margin: 4px 0; font-size: 14px; color: #666;">Status: ${
											sensor.isActive ? "Active" : "Inactive"
										}</p>
										<p style="margin: 4px 0; font-size: 12px; color: #666;">Zone: ${sensor.zone}</p>
										<div style="margin-top: 12px; display: flex; gap: 8px;">
											<button onclick="window.location.href='/section-detail/1/${
												sensor.zoneId
											}'" style="flex: 1; padding: 8px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">View Details</button>
											<button onclick="showStreetView(${sensor.location.split(",")[0]}, ${
									sensor.location.split(",")[1]
								})" style="flex: 1; padding: 8px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Street View</button>
										</div>
									</div>
								`);
								infoWindowRef.current.open(map, marker);
							}
						});

						markersRef.current.push(marker);
					}
				}
			});
		}
	}, [map, sensors]);

	// Add valve markers when valves data is loaded
	useEffect(() => {
		if (map && valves.length > 0) {
			valves.forEach((valve) => {
				// Parse location string to get coordinates
				const locationParts = valve.location.split(",");
				if (locationParts.length >= 2) {
					const lat = parseFloat(locationParts[0].trim());
					const lng = parseFloat(locationParts[1].trim());

					if (!isNaN(lat) && !isNaN(lng)) {
						const marker = new google.maps.Marker({
							position: { lat, lng },
							map: map,
							title: `${valve.name} - ${valve.isOpen ? "Open" : "Closed"}`, // Hover tooltip
							icon: {
								url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="16" fill="${
												valve.isOpen ? "#3b82f6" : "#6b7280"
											}" stroke="white" stroke-width="2"/>
                      <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">V</text>
                    </svg>
                  `)}`,
								scaledSize: new google.maps.Size(24, 24),
							},
							zIndex: 3,
						});

						// Add click listener to navigate to section detail
						marker.addListener("click", () => {
							// First click: Show info window with Street View integration
							if (infoWindowRef.current) {
								infoWindowRef.current.setContent(`
									<div style="padding: 12px; min-width: 250px;">
										<h3 style="margin: 0 0 8px 0; font-weight: bold; color: #333;">${
											valve.name
										}</h3>
										<p style="margin: 4px 0; font-size: 14px; color: #666;">Type: Irrigation Valve</p>
										<p style="margin: 4px 0; font-size: 16px; color: #333; font-weight: 600; background: #fef3c7; padding: 8px; border-radius: 4px; border-left: 4px solid #f59e0b;">
											💧 Status: ${valve.isOpen ? "Open" : "Closed"}
										</p>
										<p style="margin: 4px 0; font-size: 14px; color: #666;">Flow Rate: ${
											valve.flowRate
										} L/min</p>
										<p style="margin: 4px 0; font-size: 12px; color: #666;">Zone: ${
											valve.zoneId
										}</p>
										<div style="margin-top: 12px; display: flex; gap: 8px;">
											<button onclick="window.location.href='/section-detail/1/${
												valve.zoneId
											}'" style="flex: 1; padding: 8px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">View Details</button>
											<button onclick="showStreetView(${valve.location.split(",")[0]}, ${
									valve.location.split(",")[1]
								})" style="flex: 1; padding: 8px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Street View</button>
										</div>
									</div>
								`);
								infoWindowRef.current.open(map, marker);
							}
						});

						markersRef.current.push(marker);
					}
				}
			});
		}
	}, [map, valves]);

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
					<p className="mt-4 text-muted-foreground">Loading map data...</p>
				</div>
			</div>
		);
	}

	// Check if Google Maps API key is configured
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center max-w-md mx-auto p-6">
					<div className="text-6xl mb-4">🗺️</div>
					<h2 className="text-2xl font-bold mb-4">
						Google Maps Not Configured
					</h2>
					<p className="text-muted-foreground mb-6">
						To view the interactive map, please configure your Google Maps API
						key.
					</p>
					<div className="bg-muted p-4 rounded-lg text-sm font-mono text-left">
						<p className="mb-2">
							Create a <code>.env.local</code> file in the client directory:
						</p>
						<code className="block">
							NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
						</code>
					</div>
					<p className="text-xs text-muted-foreground mt-4">
						Get your API key from the{" "}
						<a
							href="https://console.cloud.google.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline"
						>
							Google Cloud Console
						</a>
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="p-3 md:p-6 pt-16 md:pt-6">
				<div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
					{/* Header */}
					<div className="text-center space-y-2">
						<h1 className="text-2xl md:text-3xl font-bold">
							Farm Map & Sensor Locations
						</h1>
						<p className="text-sm text-muted-foreground">
							Real-time view of sensor and valve locations across your farm.
							Each section has both a sensor (S) and valve (V) marker.
						</p>
						<Badge
							variant="outline"
							className="flex items-center gap-1 w-fit mx-auto text-foreground"
						>
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
							Live Data
						</Badge>
					</div>

					{/* Main Map Container */}
					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle className="text-lg">Farm Layout</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="relative">
								<div ref={mapRef} className="w-full h-[600px] rounded-lg" />

								{/* Legend */}
								<div className="absolute top-4 right-4 bg-background/90 backdrop-blur p-3 rounded-lg border shadow-lg">
									<h4 className="text-sm font-medium mb-2">Legend</h4>
									<div className="space-y-1 text-xs">
										<div className="flex items-center gap-2">
											<div className="w-3 h-3 bg-green-500 rounded-full"></div>
											<span>Sensor (S)</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-3 h-3 bg-red-500 rounded-full"></div>
											<span>Inactive Sensor</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-3 h-3 bg-blue-500 rounded"></div>
											<span>Valve (V) - Open</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-3 h-3 bg-gray-500 rounded"></div>
											<span>Valve (V) - Closed</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-3 h-1 bg-green-500 rounded"></div>
											<span>Farm Boundary</span>
										</div>
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded"
												style={{ background: sectionColors[0] }}
											></div>
											<span>Section 1</span>
										</div>
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded"
												style={{ background: sectionColors[1] }}
											></div>
											<span>Section 2</span>
										</div>
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded"
												style={{ background: sectionColors[2] }}
											></div>
											<span>Section 3</span>
										</div>
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded"
												style={{ background: sectionColors[3] }}
											></div>
											<span>Section 4</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Sensor/Valve Details */}
					{/* Removed selectedSensor and selectedValve state and logic */}
					{/* The details section will now show the last clicked marker's details */}
					{/* This requires a way to track the last clicked marker */}
					{/* For now, we'll just show a placeholder or remove if not needed */}
					{/* If you want to show details, you'd need to manage a state for the last clicked marker */}
					{/* Example: const [lastClickedMarker, setLastClickedMarker] = useState<google.maps.Marker | null>(null); */}
					{/* Then update it in useEffect for markers */}

					{/* Instructions Card */}
					{/* <Card>
						<CardHeader>
							<CardTitle className="text-lg">How to Use the Map</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
										1
									</div>
									<div>
										<p className="text-sm font-medium">
											Click on any sensor (S) or valve (V) marker
										</p>
										<p className="text-xs text-muted-foreground">
											Sensors and valves are positioned at different locations
											within each section
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
										2
									</div>
									<div>
										<p className="text-sm font-medium">
											Click &ldquo;View Details&rdquo; or &ldquo;Street
											View&rdquo; in the popup
										</p>
										<p className="text-xs text-muted-foreground">
											View Details navigates to section page, Street View shows
											location
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
										3
									</div>
									<div>
										<p className="text-sm font-medium">
											Or click directly on colored section areas
										</p>
										<p className="text-xs text-muted-foreground">
											This will navigate directly to section details
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card> */}

					{/* System Status Summary */}
					{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Sensors</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-sm">Active</span>
										<Badge variant="default">
											{sensors.filter((s) => s.isActive).length}
										</Badge>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm">Inactive</span>
										<Badge variant="secondary">
											{sensors.filter((s) => !s.isActive).length}
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Valves</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-sm">Open</span>
										<Badge variant="default">
											{valves.filter((v) => v.isOpen).length}
										</Badge>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm">Closed</span>
										<Badge variant="secondary">
											{valves.filter((v) => !v.isOpen).length}
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Water Flow</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-sm">Total Flow</span>
										<span className="text-sm font-medium">
											{valves
												.filter((v) => v.isOpen)
												.reduce((sum, v) => sum + v.flowRate, 0)
												.toFixed(1)}{" "}
											L/min
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div> */}
				</div>
			</div>
		</div>
	);
}
