"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Plus, Search, Trash2, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import { FadeIn } from "@/components/shared/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin" | "moderator";
  status: "active" | "inactive" | "pending";
  chapter: string;
  joinedAt: string;
  avatar?: string;
}

const MOCK_USERS: AdminUser[] = [
  { id: "1", name: "Priya Mehta", email: "priya@techsolutions.in", role: "member", status: "active", chapter: "Mumbai West", joinedAt: "2024-03-15" },
  { id: "2", name: "Rajesh Kumar", email: "rajesh@buildcorp.in", role: "moderator", status: "active", chapter: "Delhi NCR", joinedAt: "2023-11-20" },
  { id: "3", name: "Anita Sharma", email: "anita@designstudio.in", role: "member", status: "active", chapter: "Bangalore", joinedAt: "2025-01-08" },
  { id: "4", name: "Vikram Singh", email: "vikram@finserve.in", role: "member", status: "pending", chapter: "Pune", joinedAt: "2026-07-10" },
  { id: "5", name: "Admin User", email: "admin@nbn.in", role: "admin", status: "active", chapter: "HQ", joinedAt: "2022-01-01" },
  { id: "6", name: "Sneha Reddy", email: "sneha@healthcare.in", role: "member", status: "inactive", chapter: "Hyderabad", joinedAt: "2024-08-22" },
];

const STATUS_VARIANT: Record<AdminUser["status"], "success" | "warning" | "destructive"> = {
  active: "success",
  pending: "warning",
  inactive: "destructive",
};

const ROLE_VARIANT: Record<AdminUser["role"], "default" | "secondary" | "outline"> = {
  admin: "default",
  moderator: "secondary",
  member: "outline",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.chapter.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User removed");
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
    toast.success("User status updated");
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-nbn-navy lg:text-3xl">Users</h1>
            <p className="mt-1 text-muted-foreground">Manage platform members and roles</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>All Users ({filtered.length})</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Chapter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={ROLE_VARIANT[user.role]}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.chapter}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[user.status]}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.joinedAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(user.id)}>
                          {user.status === "active" ? (
                            <UserX className="h-4 w-4 text-red-500" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-emerald-500" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
