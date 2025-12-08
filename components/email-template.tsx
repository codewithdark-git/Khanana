interface OrderEmailTemplateProps {
  orderId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  customerAddress: string
  productName: string
  productPrice: number
  quantity: number
  totalAmount: number
  createdAt: string
}

export function OrderEmailTemplate({
  orderId,
  customerName,
  customerPhone,
  customerEmail,
  customerAddress,
  productName,
  productPrice,
  quantity,
  totalAmount,
  createdAt,
}: OrderEmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <div style={{ backgroundColor: "#7c2d12", padding: "20px", borderRadius: "8px 8px 0 0" }}>
        <h1 style={{ color: "#ffffff", margin: 0, fontSize: "24px" }}>Khanana - New Order Received!</h1>
      </div>

      <div style={{ backgroundColor: "#fef3c7", padding: "20px", border: "1px solid #d4a574" }}>
        <h2 style={{ color: "#7c2d12", marginTop: 0 }}>Order #{orderId}</h2>
        <p style={{ color: "#78350f" }}>
          <strong>Date:</strong> {new Date(createdAt).toLocaleString()}
        </p>

        <div style={{ backgroundColor: "#ffffff", padding: "15px", borderRadius: "8px", marginTop: "15px" }}>
          <h3 style={{ color: "#7c2d12", marginTop: 0 }}>Customer Details</h3>
          <p style={{ margin: "5px 0" }}>
            <strong>Name:</strong> {customerName}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Phone:</strong> {customerPhone}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Email:</strong> {customerEmail}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Address:</strong> {customerAddress}
          </p>
        </div>

        <div style={{ backgroundColor: "#ffffff", padding: "15px", borderRadius: "8px", marginTop: "15px" }}>
          <h3 style={{ color: "#7c2d12", marginTop: 0 }}>Order Details</h3>
          <p style={{ margin: "5px 0" }}>
            <strong>Product:</strong> {productName}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Price:</strong> Rs {productPrice.toLocaleString()}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Quantity:</strong> {quantity}
          </p>
          <p style={{ margin: "5px 0", fontSize: "18px", color: "#7c2d12" }}>
            <strong>Total:</strong> Rs {totalAmount.toLocaleString()}
          </p>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" as const }}>
          <a
            href={`https://wa.me/${customerPhone.replace(/[^0-9]/g, "")}`}
            style={{
              backgroundColor: "#22c55e",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Contact Customer on WhatsApp
          </a>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#7c2d12",
          padding: "15px",
          borderRadius: "0 0 8px 8px",
          textAlign: "center" as const,
        }}
      >
        <p style={{ color: "#fef3c7", margin: 0, fontSize: "14px" }}>
          Khanana - Authentic Pathan Shawls | 24/7 Support
        </p>
      </div>
    </div>
  )
}
