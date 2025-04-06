import { Body, Container, Head, Heading, Hr, Html, Section, Img, Link, Text } from "@react-email/components";

export function ApprovalTemplate({ name, userLink }: { name: string, userLink: string }) {
    return (
        <Html>
            <Head />
            <Body style={{ backgroundColor: "#fff", color: "#3C3842" }}>
                <Container style={{ padding: "20px", margin: "0 auto", backgroundColor: "#E0E0E0" }}>
                    <Section style={{ backgroundColor: "#fff" }}>
                        <Section style={{ backgroundColor: "#5E2CA5", textAlign: "center", padding: "20px 0" }}>
                            <Img src="https://extraordinairetalents.s3.af-south-1.amazonaws.com/logo.png" width="50" height="50" alt="ExtraOrdinaire Talent Logo" style={{ display: "block", margin: "0 auto" }} />
                        </Section>
                        <Section style={{ padding: "25px 35px" }}>
                            <Heading style={{ color: "#121212", fontSize: "22px", fontWeight: "bold" }}>You&apos;re Approved, {name}!</Heading>
                            <Text style={{ fontSize: "16px", marginBottom: "14px" }}>
                                Congratulations! Your registration for the <strong>Extraordinaire Competition</strong> was reviewed and has been approved. We can&apos;t wait to see you compete!
                            </Text>
                            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                                Copy your personalized voting link below, and share to your family and friend to vote for you.
                            </Text>
                            <Section style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px", width:"100%" }}>
                                <Link href={userLink} style={{ backgroundColor: "#03DAC6", width:"100%", padding: "12px 24px", borderRadius: "8px", color: "#fff", fontSize: "16px", textDecoration: "none", fontWeight: "bold" }}>{userLink}</Link>
                            </Section>
                            <Hr style={{ borderColor: "#E0E0E0"}} />
                        </Section>
                    </Section>
                    <Text style={{ fontSize: "12px", padding: "0 20px", textAlign: "center" }}>
                        &copy; 2025 ExtraOrdinaire Talent Web Services, Inc. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}