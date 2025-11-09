import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import QRCode from "qrcode";

async function generateQRCodeWithLogo(): Promise<string> {
  try {
    // Generate QR code with high error correction for logo overlay
    const qrCodeDataURL = await QRCode.toDataURL(
      "https://mpr-noel.romain-ecarnot.com",
      {
        errorCorrectionLevel: "H",
        margin: 2,
        width: 300,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }
    );

    // For now, return the basic QR code
    // TODO: Implement logo overlay functionality
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    // Fallback to basic QR code without logo
    return await QRCode.toDataURL("https://mpr-noel.romain-ecarnot.com", {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
    });
  }
}

export default async function QRCodeSection() {
  const qrCodeDataURL = await generateQRCodeWithLogo();

  return (
    <section className="bg-noel-snow hidden py-16 lg:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp">
          <div className="text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              Toujours à portée de main
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
              Scannez ce QR code pour accéder rapidement au site depuis votre
              téléphone mobile et ne rien rater du marché de Noël.
            </p>

            <div className="flex justify-center">
              <div className="rounded-lg bg-white p-4 shadow-lg">
                <Image
                  src={qrCodeDataURL}
                  alt="QR code pour accéder au Marché de Noël du MPR depuis votre téléphone mobile"
                  width={256}
                  height={256}
                  className="h-64 w-64"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
