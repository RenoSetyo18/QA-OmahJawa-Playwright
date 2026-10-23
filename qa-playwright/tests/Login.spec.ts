import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

test("Cek halaman login Laravel", async ({ page }) => {
  // Pastikan judul halaman mengandung kata "Login" (atau sesuaikan)
  await expect(
    page.getByRole("heading", { name: "Masuk ke Akun" }),
  ).toBeVisible();

  await page.getByRole("textbox", { name: "email" }).fill("reno@gmail.com");
  await page.getByRole("textbox", { name: "kata sandi" }).fill("reno123");

  await page.getByRole("button", { name: "Masuk" }).click();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("Cek negatif login", async ({ page }) => {
  await page.getByRole("textbox", { name: "email" }).fill("reno123@gmail.com");
  await page.getByRole("textbox", { name: "kata sandi" }).fill("reno123");

  await page.getByRole("button", { name: "Masuk" }).click();

  const notifikasi = page.locator(".swal2-popup");
  await expect(
    notifikasi.getByRole("heading", { name: "Error" }),
  ).toBeVisible();
});
