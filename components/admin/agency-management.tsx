"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreHorizontal,
  Building2,
  Users,
  DollarSign,
  Eye,
  Ban,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useGet } from "@/api/apiMethode";
import { useDebounce } from "@/hooks/useDebounce";

// Mock agency data
const agencies = [
  {
    id: "1",
    name: "Digital Marketing Pro",
    email: "admin@digitalmarketingpro.com",
    logo: "/placeholder.svg?height=40&width=40",
    domain: "clients.digitalmarketingpro.com",
    clients: 12,
    revenue: "$2,388/month",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    plan: "Agency",
  },
  {
    id: "2",
    name: "Creative Solutions Ltd",
    email: "contact@creativesolutions.com",
    logo: "/placeholder.svg?height=40&width=40",
    domain: "portal.creativesolutions.com",
    clients: 8,
    revenue: "$1,592/month",
    status: "active",
    joinDate: "2024-02-01",
    lastActive: "1 day ago",
    plan: "Agency",
  },
  {
    id: "3",
    name: "Social Media Experts",
    email: "hello@socialmediaexperts.com",
    logo: "/placeholder.svg?height=40&width=40",
    domain: "app.socialmediaexperts.com",
    clients: 25,
    revenue: "$4,975/month",
    status: "active",
    joinDate: "2023-11-20",
    lastActive: "3 hours ago",
    plan: "Enterprise",
  },
  {
    id: "4",
    name: "Brand Boost Agency",
    email: "info@brandboost.com",
    logo: "/placeholder.svg?height=40&width=40",
    domain: "clients.brandboost.com",
    clients: 6,
    revenue: "$1,194/month",
    status: "suspended",
    joinDate: "2024-03-10",
    lastActive: "1 week ago",
    plan: "Agency",
  },
];

// Mock client data for agencies
const agencyClients = {
  "1": [
    {
      name: "Tech Startup Inc",
      status: "active",
      posts: 45,
      engagement: "4.2%",
    },
    {
      name: "Fashion Brand Co",
      status: "active",
      posts: 32,
      engagement: "3.8%",
    },
    {
      name: "Food Delivery App",
      status: "inactive",
      posts: 12,
      engagement: "2.1%",
    },
  ],
  "2": [
    {
      name: "Local Restaurant",
      status: "active",
      posts: 28,
      engagement: "5.1%",
    },
    { name: "Fitness Studio", status: "active", posts: 41, engagement: "4.7%" },
  ],
  "3": [
    {
      name: "E-commerce Store",
      status: "active",
      posts: 67,
      engagement: "6.2%",
    },
    { name: "SaaS Company", status: "active", posts: 89, engagement: "5.8%" },
    {
      name: "Consulting Firm",
      status: "active",
      posts: 34,
      engagement: "4.1%",
    },
  ],
};

interface Agencys {
  id: string;
  name: string;
  email: string;
  logo: string;
  domain: string;
  clients: number;
  revenue: string;
  status: string;
  joinDate: string;
  lastActive: string;
  plan: string;
}

export function AgencyManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);
  const [agencyLists, setAgencyLists] = useState<Agencys[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredAgencies = agencies.filter((agency) => {
    const matchesSearch =
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || agency.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalAgencies = agencies.length;
  const activeAgencies = agencies.filter((a) => a.status === "active").length;
  const totalClients = agencies.reduce(
    (sum, agency) => sum + agency.clients,
    0
  );
  const totalRevenue = agencies.reduce((sum, agency) => {
    const revenue = Number.parseInt(agency.revenue.replace(/[$,/month]/g, ""));
    return sum + revenue;
  }, 0);

  useEffect(() => {
    getAgencies();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    getAgencies(
      currentPage,
      statusFilter === "all" ? "" : statusFilter,
      debouncedSearch
    );
  }, [statusFilter, debouncedSearch, currentPage]);

  const getAgencies = async (cp = 1, status = "", search = "") => {
    setLoading(true);
    try {
      const { res, error } = await useGet(
        `/api/agencies?page=${cp}&limit=${pagination.limit}&search=${search}&isActive=${status}`
      );

      if (error) {
        console.error("API ERROR", error);
        return;
      }

      if (res?.success) {
        setAgencyLists(res.data.agencies || []);
        setPagination(res.data.pagination);
      } else {
        setAgencyLists([]);
      }
    } catch (err) {
      console.error("Unexpected error while fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Agency Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{totalAgencies}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Agencies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold text-green-600">
                {activeAgencies}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Active Agencies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{totalClients}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Agency Filters</CardTitle>
          <CardDescription>Search and filter agency accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search agencies by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Agencies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agency Accounts</CardTitle>
          <CardDescription>
            Manage agency accounts and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Clients</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : agencyLists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No agencies found
                  </TableCell>
                </TableRow>
              ) : (
                agencyLists.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={agency.logo || "/placeholder.svg"}
                            alt={agency.name}
                          />
                          <AvatarFallback>
                            {agency.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{agency.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {agency.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-mono">{agency.domain}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{agency.clients}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {agency.revenue}
                    </TableCell>
                    <TableCell>{getStatusBadge(agency.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {agency.lastActive}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => setSelectedAgency(agency.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Clients
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {agency.status === "suspended" ? (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Reactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend Agency
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Agency Clients Detail */}
      {selectedAgency && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {agencies.find((a) => a.id === selectedAgency)?.name} -
                  Clients
                </CardTitle>
                <CardDescription>
                  Client accounts managed by this agency
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedAgency(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posts This Month</TableHead>
                  <TableHead>Engagement Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agencyClients[
                  selectedAgency as keyof typeof agencyClients
                ]?.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          client.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.posts}</TableCell>
                    <TableCell>{client.engagement}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {agencyLists.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) =>
                        Math.min(pagination.totalPages, p + 1)
                      )
                    }
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
