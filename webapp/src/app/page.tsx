"use client"
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setUser } from '../utils/user';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Ensure user data is initialized in localStorage
    setUser();
    router.replace('/timeline');
  }, [router]);
  
  return (
    <div className={styles.page}>
    </div>
  );
}
