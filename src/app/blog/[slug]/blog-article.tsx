"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Clock, User, ArrowLeft, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, SectionHeading } from "@/components/shared/animations";
import type { BlogPost } from "@/types";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    name: "Suresh Kumar",
    text: "Excellent article! We've implemented the referral tracking spreadsheet and already seeing better accountability in our Pune chapter.",
    date: "2026-07-16T14:30:00+05:30",
  },
  {
    id: "c2",
    name: "Meera Joshi",
    text: "The tip about being specific with ideal client profiles is gold. Shared this with our entire Mumbai Central chapter.",
    date: "2026-07-17T09:15:00+05:30",
  },
];

export function BlogArticle({ post, relatedPosts }: BlogArticleProps) {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setComments([
      {
        id: `c-${Date.now()}`,
        name: name.trim(),
        text: comment.trim(),
        date: new Date().toISOString(),
      },
      ...comments,
    ]);
    setName("");
    setComment("");
  };

  const contentSections = post.content.split("\n\n");

  return (
    <article className="pt-28 pb-20">
      <div className="container-nbn max-w-4xl">
        <FadeIn>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-nbn-teal hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </FadeIn>

        {/* Hero */}
        <FadeIn>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-nbn-teal/10 text-nbn-teal border border-nbn-teal/20">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-nbn-navy dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted mb-8">
            <span className="flex items-center gap-2">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <User className="w-4 h-4" />
              {post.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
            <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </FadeIn>

        {/* Article Content */}
        <FadeIn delay={0.15}>
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {contentSections.map((section, i) => {
              if (section.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl font-heading font-bold text-nbn-navy dark:text-white mt-8 mb-4"
                  >
                    {section.replace("## ", "")}
                  </h2>
                );
              }
              if (section.startsWith("1. ") || section.startsWith("- ")) {
                const items = section.split("\n");
                const isOrdered = section.startsWith("1. ");
                const ListTag = isOrdered ? "ol" : "ul";
                return (
                  <ListTag
                    key={i}
                    className={`${isOrdered ? "list-decimal" : "list-disc"} pl-6 space-y-2 text-muted mb-6`}
                  >
                    {items.map((item, j) => (
                      <li key={j} className="leading-relaxed">
                        {item.replace(/^(\d+\.\s|-\s|\*\*[^*]+\*\*\s?)/g, "").trim() || item}
                      </li>
                    ))}
                  </ListTag>
                );
              }
              return (
                <p key={i} className="text-muted leading-relaxed mb-6">
                  {section}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-nbn-navy/5 text-nbn-navy"
              >
                #{tag}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Comments Section */}
        <FadeIn delay={0.2}>
          <div className="border-t border-nbn-navy/10 pt-12">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="w-5 h-5 text-nbn-teal" />
              <h2 className="text-2xl font-heading font-bold text-nbn-navy dark:text-white">
                Comments ({comments.length})
              </h2>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="comment-name">Your Name</Label>
                    <Input
                      id="comment-name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="comment-text">Comment</Label>
                    <Textarea
                      id="comment-text"
                      placeholder="Share your thoughts..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <Button type="submit">
                    <Send className="w-4 h-4" />
                    Post Comment
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {comments.map((c) => (
                <Card key={c.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-heading font-bold text-nbn-navy dark:text-white">
                        {c.name}
                      </p>
                      <span className="text-xs text-muted">
                        {format(new Date(c.date), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                    <p className="text-muted leading-relaxed">{c.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <FadeIn delay={0.25}>
            <div className="mt-16 pt-12 border-t border-nbn-navy/10">
              <SectionHeading
                title="Related Articles"
                subtitle="Continue reading"
                centered={false}
              />
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link key={related._id} href={`/blog/${related.slug}`}>
                    <Card className="h-full overflow-hidden group hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="relative h-40">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="300px"
                        />
                      </div>
                      <CardContent className="p-4">
                        <span className="text-xs text-nbn-teal font-semibold">
                          {related.category}
                        </span>
                        <h3 className="text-sm font-heading font-bold text-nbn-navy dark:text-white mt-1 group-hover:text-nbn-teal transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <span className="text-xs text-muted flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3" />
                          {related.readingTime} min read
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </article>
  );
}
