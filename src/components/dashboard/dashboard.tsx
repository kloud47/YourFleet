"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPinIcon,
  TruckIcon,
  BellIcon,
  UserIcon,
  ChevronDownIcon,
  AlertTriangleIcon,
} from "lucide-react";

interface Truck {
  id: string;
  truckId: string;
  driver: string;
  latitude: number;
  longitude: number;
  speed: number;
  route: string;
  capacity: number;
}

interface Route {
  id: string;
  name: string;
  eta: string;
  status: string;
}

interface Alert {
  id: string;
  type: string;
  message: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    activeTrucks: 0,
    averageSpeed: 0,
    totalDistance: 0,
    averageDeliveryTime: "0h 0m",
  });

  useEffect(() => {
    const fetchData = async () => {
      const trucksResponse = await axios.get("/api/trucks");
      const routesResponse = await axios.get("/api/routes");
      const alertsResponse = await axios.get("/api/alerts");
      // const usersResponse = await axios.get("/api/users");
      setTrucks(trucksResponse.data);
      setRoutes(routesResponse.data);
      setAlerts(alertsResponse.data);
      // setUsers(usersResponse.data);
      const activeTrucks = trucksResponse.data.length;
      const averageSpeed =
        trucksResponse.data.reduce(
          (sum: number, truck: Truck) => sum + truck.speed,
          0
        ) / activeTrucks;
      const totalDistance = 1250; // This should be calculated based on actual route data
      const averageDeliveryTime = "2h 45m"; // This should be calculated based on actual delivery data
      setPerformanceMetrics({
        activeTrucks,
        averageSpeed: Math.round(averageSpeed),
        totalDistance,
        averageDeliveryTime,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Fleet Dashboard</h2>
          <nav>
            <Button variant="ghost" className="w-full justify-start mb-2">
              <MapPinIcon className="mr-2 h-4 w-4" />
              Tracking
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2">
              <TruckIcon className="mr-2 h-4 w-4" />
              Routes
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2">
              <BellIcon className="mr-2 h-4 w-4" />
              Alerts
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <UserIcon className="mr-2 h-4 w-4" />
              User Management
            </Button>
          </nav>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold mb-4">Fleet Overview</h1> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Trucks
                </CardTitle>
                <TruckIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceMetrics.activeTrucks}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Speed
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceMetrics.averageSpeed} mph
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Distance
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceMetrics.totalDistance} mi
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Delivery Time
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceMetrics.averageDeliveryTime}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="map" className="space-y-4">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Map Placeholder</span>
            </div>
            {selectedTruck && (
              <Card>
                <CardHeader>
                  <CardTitle>Truck Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Truck ID: {selectedTruck.truckId}</p>
                  <p>Driver: {selectedTruck.driver}</p>
                  <p>Speed: {selectedTruck.speed} mph</p>
                  <p>Route: {selectedTruck.route}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4">
              {trucks.map((truck) => (
                <Card key={truck.id}>
                  <CardHeader>
                    <CardTitle>{truck.truckId}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p>Driver: {truck.driver}</p>
                        <p>Speed: {truck.speed} mph</p>
                        <p>Route: {truck.route}</p>
                      </div>
                      <Button onClick={() => setSelectedTruck(truck)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Route Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{route.name}</p>
                      <p className="text-sm text-gray-500">ETA: {route.eta}</p>
                    </div>
                    <Badge
                      variant={
                        route.status === "On Time" ? "default" : "destructive"
                      }
                    >
                      {route.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts and Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-2">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-sm text-gray-500">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Capacity Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trucks.map((truck) => (
                <div key={truck.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{truck.truckId}</span>
                    <span>{truck.capacity}%</span>
                  </div>
                  <Progress value={truck.capacity} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Manage
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
