import { useNavigate } from "react-router-dom"

export default function CasaCmg() {
  const navigate = useNavigate()
  return (
    <>
      <div
        style={{
          backgroundImage: "url( heart.jpg)",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50% , -50%)",
            padding: "50px",
            backgroundColor: "red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Te amo dms princesa</h1>
          <video src="videos/lary.mp4" controls autoPlay></video>
          <button
            onClick={() => {
              navigate("/")
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  )
}
