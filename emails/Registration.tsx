import { Body, Container, Head, Heading, Hr, Html, Section, Img, Text } from "@react-email/components";


export default function RegisterTemplate({ name }: { name: string }) {
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
                            <Heading style={{ color: "#121212", fontSize: "22px", fontWeight: "bold" }}>Registration Confirmation</Heading>
                            <Text style={{ fontSize: "16px", marginBottom: "14px" }}>
                                Thank you for {name} registering for the <strong>Extraordinaire Talents Competition</strong>. Your registration has been successfully processed! We are thrilled to have you participate.
                            </Text>
                            <Text style={{ fontSize: "16px", marginBottom: "14px" }}>
                                Your application will be reviewed, and if accepted, you will receive an acceptance email, and your personalized link for voting activities.
                            </Text>
                            <Hr style={{ borderColor: "#E0E0E0", margin: "16px 0" }} />
                        </Section>
                        <Section style={{ padding: "25px 35px" }}>
                            <Text style={{ fontSize: "14px", color: "#CF6679" }}>
                                Reminder: ExtraOrdinaire Talent will never ask you for your unique ID, credit card, or banking information via email.
                            </Text>
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