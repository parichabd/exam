import Image from "next/image";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:6500";

export default async function TourPage({ params }) {
  // ⚡ unwrap کردن params
  const { slug: id } = await params; // ← این مهمه در Next.js 14+

  let tour = null;
  let error = null;

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/tour/${id}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      error = `خطا ${res.status} – ${res.statusText}`;
    } else {
      tour = await res.json();
    }
  } catch (err) {
    error = "خطا در ارتباط با سرور";
    console.error(err);
  }

  if (!tour) {
    return (
      <div dir="rtl" style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ color: "#e74c3c" }}>تور یافت نشد</h1>
        <p>ID دریافتی: {id}</p>
        {error && <p style={{ color: "#e74c3c" }}>خطا: {error}</p>}
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "1.5rem" }}
    >
      <h1>{tour.title || "بدون عنوان"}</h1>
      <Image
        src={
          tour.image?.startsWith("http")
            ? tour.image
            : `${BACKEND_BASE_URL}${tour.image}`
        }
        alt={tour.title || "تصویر تور"}
        width={600}
        height={340}
        style={{ borderRadius: "12px", objectFit: "cover" }}
        priority
        unoptimized
      />
      <p>
        مبدا → مقصد: {tour.origin?.name || "—"} →{" "}
        {tour.destination?.name || "—"}
      </p>
      <p>
        تاریخ: {new Date(tour.startDate).toLocaleDateString("fa-IR")} تا{" "}
        {new Date(tour.endDate).toLocaleDateString("fa-IR")}
      </p>
      <p>قیمت: {Number(tour.price).toLocaleString("fa-IR")} تومان</p>
      <p>ظرفیت باقی‌مانده: {tour.availableSeats} نفر</p>
      <p>وسیله نقلیه: {tour.fleetVehicle || "نامشخص"}</p>
      <p>بیمه: {tour.insurance ? "دارد" : "ندارد"}</p>
      {tour.options?.length > 0 && (
        <ul style={{ paddingRight: "1.5rem", marginTop: "0.5rem" }}>
          {tour.options.map((opt, i) => (
            <li key={i}>{opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
