"use client";

import AnimatedSection, { StaggerItem } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "JULIE POTTEEUW",
    role: "Présidente",
    image: "/team/julie.webp",
  },
  {
    name: "PIERRE GERGAUD",
    role: "Vice-président",
    image: "/team/pierre.webp",
  },
  {
    name: "VLADIMIR MOREAU",
    role: "Délégué",
    image: "/team/vladimir.webp",
  },
  {
    name: "ELSA GUBA",
    role: "Trésorière",
    image: "/team/elsa.webp",
  },
  {
    name: "LOU-EMMA BONTEMPS",
    role: "Secrétaire",
    image: "/team/lou-emma.webp",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.split(" ");
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
}

function TeamMemberAvatar({ image, name }: { image: string; name: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full">
      {!imageError ? (
        <Image
          src={image}
          alt={`Photo de ${name}`}
          width={64}
          height={64}
          className="object-cover"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm font-semibold"
          aria-hidden="true"
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}

export default function TeamApraih() {
  return (
    <AnimatedSection
      animation="stagger"
      staggerChildren={true}
      staggerDelay={0.1}
      className="w-full"
    >
      <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
        {teamMembers.map((member, index) => (
          <StaggerItem key={`${member.name}-${index}`} className="w-full">
            <Card
              className="bg-card border-border flex h-full w-full flex-col items-center gap-2 p-3 py-3 text-center transition-shadow hover:shadow-lg"
              role="article"
              aria-label={`${member.name}, ${member.role}`}
            >
              <CardContent className="flex flex-col items-center gap-2 px-3 pt-0">
                <TeamMemberAvatar image={member.image} name={member.name} />
                <div className="space-y-0.5">
                  <div className="text-card-foreground text-sm font-semibold">
                    {(() => {
                      const { firstName, lastName } = splitName(member.name);
                      return (
                        <>
                          <div>{firstName}</div>
                          {lastName && <div>{lastName}</div>}
                        </>
                      );
                    })()}
                  </div>
                  <p className="text-muted-foreground text-xs">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
