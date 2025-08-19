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
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
} from "lucide-react";
import { useGet } from "@/api/apiMethode";
import { useDebounce } from "@/hooks/useDebounce";

// Mock user data
const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    plan: "Pro",
    status: "active",
    lastActive: "2 hours ago",
    joinDate: "2024-01-15",
    revenue: "$29/month",
    type: "individual",
  },
  {
    id: "2",
    name: "Digital Agency Co.",
    email: "admin@digitalagency.com",
    avatar: "/placeholder.svg?height=32&width=32",
    plan: "Agency",
    status: "active",
    lastActive: "5 minutes ago",
    joinDate: "2024-02-01",
    revenue: "$199/month",
    type: "agency",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@startup.com",
    avatar: "/placeholder.svg?height=32&width=32",
    plan: "Free",
    status: "inactive",
    lastActive: "2 days ago",
    joinDate: "2024-03-10",
    revenue: "$0/month",
    type: "individual",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@freelancer.com",
    avatar: "/placeholder.svg?height=32&width=32",
    plan: "Pro",
    status: "suspended",
    lastActive: "1 week ago",
    joinDate: "2024-01-20",
    revenue: "$29/month",
    type: "individual",
  },
  {
    id: "5",
    name: "Tech Solutions Ltd.",
    email: "contact@techsolutions.com",
    avatar: "/placeholder.svg?height=32&width=32",
    plan: "Enterprise",
    status: "active",
    lastActive: "1 hour ago",
    joinDate: "2023-12-05",
    revenue: "$499/month",
    type: "agency",
  },
];

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  plan: string;
  status: string;
  isActive: boolean;
  lastActive: string;
  revenue: number | string;
  joinDate: string;
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [userLists, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesType = typeFilter === "all" || user.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Free":
        return <Badge variant="outline">Free</Badge>;
      case "Pro":
        return <Badge className="bg-blue-100 text-blue-800">Pro</Badge>;
      case "Agency":
        return <Badge className="bg-purple-100 text-purple-800">Agency</Badge>;
      case "Enterprise":
        return (
          <Badge className="bg-orange-100 text-orange-800">Enterprise</Badge>
        );
      default:
        return <Badge variant="secondary">{plan}</Badge>;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    getUsers(
      currentPage,
      statusFilter === "all" ? "" : statusFilter,
      debouncedSearch
    );
  }, [statusFilter, debouncedSearch, currentPage]);

  const getUsers = async (cp = 1, status = "", search = "") => {
    setLoading(true);
    try {
      const { res, error } = await useGet(
        `/api/users?page=${cp}&limit=${pagination.limit}&search=${search}&isActive=${status}`
      );

      console.log("RESPONSE", res);

      if (error) {
        console.error("API ERROR", error);
        return;
      }

      if (res?.success) {
        setUser(res.data.users || []);
        setPagination(res.data.pagination);
      } else {
        setUser([]);
      }
    } catch (err) {
      console.error("Unexpected error while fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>User Filters</CardTitle>
          <CardDescription>
            Search and filter users by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
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
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
                {/* <SelectItem value="suspended">Suspended</SelectItem> */}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="agency">Agency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">1,847</div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-sm text-muted-foreground">Suspended Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <p className="text-sm text-muted-foreground">Agency Accounts</p>
          </CardContent>
        </Card>
      </div>
      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage platform users and their accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Join Date</TableHead>
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
              ) : userLists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                userLists.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.firstName}
                          />
                          <AvatarFallback>
                            {user.firstName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.firstName}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(user.plan)}</TableCell>
                    <TableCell>
                      {getStatusBadge(user.isActive ? "active" : "inactive")}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.lastActive}
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.revenue}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.joinDate}
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "suspended" ? (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Reactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Ban User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {userLists.length > 0 && (
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
    </div>
  );
}
