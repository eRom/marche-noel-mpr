import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import QRCode from "qrcode";

async function generateQRCodeWithLogo(): Promise<string> {
  try {
    // Generate QR code with high error correction for logo overlay
    const qrCodeDataURL = await QRCode.toDataURL("https://marche-noel-mpr.vercel.app", {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    // For now, return the basic QR code
    // TODO: Implement logo overlay functionality
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    // Fallback to basic QR code without logo
    return await QRCode.toDataURL("https://marche-noel-mpr.vercel.app", {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
    });
  }
}

export default async function QRCodeSection() {
  const qrCodeDataURL = await generateQRCodeWithLogo();

  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background hidden lg:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Toujours à portée de main
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Scannez ce QR code pour accéder rapidement au site depuis votre téléphone mobile et ne rien rater du marché de Noël.
            </p>
            
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Image
                  src={qrCodeDataURL}
                  alt="QR code pour accéder au Marché de Noël du MPR depuis votre téléphone mobile"
                  width={256}
                  height={256}
                  className="w-64 h-64"
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
