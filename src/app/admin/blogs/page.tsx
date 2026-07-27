"use client";

import { useState } from "react";
import { Clock, Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FadeIn } from "@/components/shared/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminBlog {
  id: string;
  title: string;
  category: string;
  author: string;
  status: "published" | "draft" | "archived";
  publishedAt: string;
  readingTime: number;
  views: number;
}

const MOCK_BLOGS: AdminBlog[] = [
  { id: "1", title: "10 Strategies to Maximize Business Referrals", category: "Networking", author: "NBN Editorial", status: "published", publishedAt: "2026-07-20", readingTime: 8, views: 2450 },
  { id: "2", title: "Building Trust in Business Relationships", category: "Leadership", author: "Priya Mehta", status: "published", publishedAt: "2026-07-15", readingTime: 6, views: 1820 },
  { id: "3", title: "Digital Transformation for SMEs", category: "Technology", author: "Rajesh Kumar", status: "published", publishedAt: "2026-07-10", readingTime: 10, views: 3100 },
  { id: "4", title: "Chapter Leadership Best Practices", category: "Leadership", author: "Admin", status: "draft", publishedAt: "—", readingTime: 7, views: 0 },
  { id: "5", title: "Annual Networking Trends Report 2026", category: "Insights", author: "NBN Research", status: "published", publishedAt: "2026-07-01", readingTime: 15, views: 5200 },
  { id: "6", title: "Legacy Member Success Stories", category: "Success Stories", author: "Content Team", status: "archived", publishedAt: "2025-12-15", readingTime: 12, views: 8900 },
];

const STATUS_VARIANT: Record<AdminBlog["status"], "success" | "warning" | "secondary"> = {
  published: "success",
  draft: "warning",
  archived: "secondary",
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(MOCK_BLOGS);
  const [search, setSearch] = useState("");

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    toast.success("Blog deleted");
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-nbn-navy lg:text-3xl">Blogs</h1>
            <p className="mt-1 text-muted-foreground">Manage blog posts and content</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>All Posts ({filtered.length})</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search blogs..."
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{blog.title}</p>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {blog.readingTime} min read
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{blog.category}</Badge>
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[blog.status]}>{blog.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{blog.publishedAt}</TableCell>
                    <TableCell>{blog.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
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
