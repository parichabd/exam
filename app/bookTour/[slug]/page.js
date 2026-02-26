import Image from "next/image";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:6500";

export default async function BookTourPage({ params }) {
  const { id } = await params;

  const res = await fetch(`${BACKEND_BASE_URL}/tour/${id}`, {
    cache: "no-store",
  });

  const tour = await res.json();

  const days =
    Math.ceil(
      (new Date(tour.endDate) - new Date(tour.startDate)) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  return (
    <div dir="rtl" style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      
      {/* ====== فرم اطلاعات ====== */}
      <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12, marginBottom: 30 }}>
        <h2>اطلاعات مسافر</h2>

        <input placeholder="نام" style={inputStyle} />
        <input placeholder="نام خانوادگی" style={inputStyle} />

        <select style={inputStyle}>
          <option value="">انتخاب جنسیت</option>
          <option value="male">مرد</option>
          <option value="female">زن</option>
        </select>

        <input placeholder="کد ملی" style={inputStyle} />
        <input type="date" style={inputStyle} />
      </div>

      {/* ====== خلاصه تور ====== */}
      <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
        <h2>خلاصه تور</h2>

        <p>نام تور: {tour.title}</p>
        <p>تعداد روز اقامت: {days} روز</p>

        <hr />

        <h3>
          قیمت نهایی: {Number(tour.price).toLocaleString("fa-IR")} تومان
        </h3>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: 15,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
};