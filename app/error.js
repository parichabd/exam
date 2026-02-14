"use client";
import ServerConectionError from "@/Components/Errors/ServerConectionError";

function Error500() {
  return (
    <div>
      <ServerConectionError />
    </div>
  );
}

export default Error500;
