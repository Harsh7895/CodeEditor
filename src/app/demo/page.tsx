"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  const [loading, setLoading] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);

  const handleBlocking = async () => {
    setLoading(true);
    await fetch("/api/demo/blocking", {
      method: "POST",
    });
    setLoading(false);
  };

  const handleBackground = async () => {
    setLoading1(true);
    await fetch("/api/demo/background", {
      method: "POST",
    });
    setLoading1(false);
  };

  return (
    <div className="p-8 space-x-4">
      <Button onClick={handleBlocking}>
        {loading ? "Loading..." : "Blocking"}
      </Button>
      <Button onClick={handleBackground}>
        {loading1 ? "Loading..." : "Background"}
      </Button>
    </div>
  );
};

export default page;
