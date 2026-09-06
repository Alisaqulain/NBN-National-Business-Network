import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ebn.in";
  const routes = [
    "", "about", "membership", "chapters", "events", "success-stories",
    "categories", "resources", "blog", "contact", "login", "signup",
    "privacy", "terms", "cookies",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
