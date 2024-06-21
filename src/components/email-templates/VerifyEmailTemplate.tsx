type VerifyEmailTemplateProps = {
  email: string;
  emailVerificationToken: string;
};

const VerifyEmailTemplate = ({
  email,
  emailVerificationToken,
}: VerifyEmailTemplateProps) => {
  return (
    <div
      style={{
        fontFamily: "Nunito, Arial, sans-serif",
        color: "hsl(262, 0%, 10%)",
        lineHeight: "1.6",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid hsl(262, 50%, 32.2%)",
          borderRadius: "5px",
          backgroundColor: "hsla(262, 50%, 75%, 0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}></div>
        <h1 style={{ color: "hsl(262, 50%, 32.2%)" }}>
          Vérification de l&apos;adresse email
        </h1>
        <p>Bonjour,</p>
        <p>
          Merci de vous être inscrit sur JumpOrga. Veuillez vérifier votre
          adresse email en cliquant sur le lien ci-dessous :
        </p>
        <a
          href={`http://localhost:3000/verify-email?token=${emailVerificationToken}`}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            margin: "20px 0",
            backgroundColor: "hsl(262, 50%, 32.2%)",
            color: "hsl(0, 0%, 100%)",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Vérifier mon adresse email
        </a>
        <p>
          Si vous n&apos;avez pas créé de compte sur JumpOrga, vous pouvez
          ignorer cet email.
        </p>
        <p>Merci,</p>
        <p>L&apos;équipe JumpOrga</p>
      </div>
    </div>
  );
};

export default VerifyEmailTemplate;
