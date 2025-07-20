"use client";

import type * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    images: string[];
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
  };
  index: number;
  isDarkMode: boolean;
}

export function ProjectCard({ project, index, isDarkMode }: ProjectCardProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isFocused, setIsFocused] = useState(false);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <Card
      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105 ${
        isDarkMode ? "bg-slate-800" : "bg-white"
      }`}>
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {project.images.map((img, imgIndex) => (
              <div
                key={imgIndex}
                className="embla__slide relative min-w-full h-48 sm:h-56">
                <Image
                  src={img}
                  alt={`${project.title} image ${imgIndex + 1}`}
                  fill
                  className="object-scale-down group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute inset-0 ${
                    isDarkMode
                      ? "bg-gradient-to-t from-gray-100/20 to-transparent"
                      : "bg-gradient-to-t from-gray-100/20 to-transparent"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next buttons appear only on focus/hover */}
        {isFocused && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-20">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-20">
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      </div>

      <CardContent className="p-4 sm:p-6">
        <h3
          className={`text-lg sm:text-xl font-semibold mb-2 ${
            isDarkMode ? "text-white" : "text-slate-800"
          }`}>
          {project.title}
        </h3>
        <p
          className={`mb-4 text-sm sm:text-base line-clamp-3 ${
            isDarkMode ? "text-slate-300" : "text-slate-600"
          }`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <Badge
              key={techIndex}
              variant="secondary"
              className={`text-xs ${
                isDarkMode
                  ? "bg-slate-700 text-slate-300"
                  : "bg-orange-100 text-orange-700"
              }`}>
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-3">
          <Button
            size="sm"
            className={`flex-1 text-sm ${
              project.liveUrl === "#"
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : isDarkMode
                ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                : "bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700"
            }`}
            disabled={project.liveUrl === "#"}
            onClick={() => window.open(project.liveUrl, "_blank")}>
            <ExternalLink className="mr-2 h-3 w-3" />
            Live Demo
          </Button>

          <Button
            variant="outline"
            size="sm"
            className={isDarkMode ? "border-slate-600 text-slate-300" : ""}
            disabled={project.githubUrl === "#"}
            onClick={() => window.open(project.githubUrl, "_blank")}>
            <Github className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
