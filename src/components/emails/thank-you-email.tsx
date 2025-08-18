import * as React from "react";

import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text
} from "@react-email/components";

interface EmailVariables {
    messageData: {
        date: string;
        dateTime: string;
        title: string;
        name: string;
        email: string;
        message: string;
        source: string;
        referringPage: string;
    }
}

export const EmailTemplate = (props: EmailVariables) => (
    <Html>
        <Head />
        <Preview>Thanks for reaching out! I&apos;ll be in touch soon.</Preview>
        <Body style={main}>
            <Tailwind>
                <Section style={header}>
                    <Link href='https://tylerlatshaw.com/?utm_source=autoresponder&utm_medium=email&utm_campaign=thank_you_email'>
                        <Img
                            style={imgHeader}
                            src={"https://tylerlatshaw.com/static/logo.png"}
                            width={300}
                            alt="Tyler Latshaw logo"
                            className="pt-8 pb-8"
                        />
                    </Link>
                </Section>
                <Container style={container}>
                    <Heading style={heading}>
                        {props.messageData.title}
                    </Heading>

                    <Section style={mainSection}>
                        <Text style={text}>Hello, {props.messageData.name}!</Text>

                        <Text style={text}>Thanks for sending me a message on <Link href="https://tylerlatshaw.com/?utm_source=autoresponder&utm_medium=email&utm_campaign=thank_you_email">my website</Link>! I&apos;ll be in touch soon. Below is a copy of your message:</Text>

                        <Text style={userMessage}>{props.messageData.message}</Text>

                        <Section style={alignRight}>
                            <Img
                                src={"https://tylerlatshaw.com/static/signature.png"}
                                alt="Tyler signature"
                                style={signature}
                            />
                        </Section>

                        <Section style={callToAction}>
                            <Text style={ctaHeader}>
                                Get in Contact
                            </Text>

                            <Section style={alignCenter}>
                                <Button style={ctaButton} href="mailto:tyler@tylerlatshaw.com">
                                    Email
                                </Button>
                                <Button style={ctaButton} href="https://tylerlatshaw.com/?utm_source=autoresponder&utm_medium=email&utm_campaign=thank_you_email">
                                    Website
                                </Button>
                                <Button style={ctaButton} href="https://www.linkedin.com/in/tylerlatshaw/">
                                    LinkedIn
                                </Button>
                            </Section>
                        </Section>

                    </Section>

                    <Text style={disclaimer}>
                        You are receiving this message because you provided your information on my website.
                    </Text>


                    <Text style={footerLinkSection}>
                        <Link href='https://tylerlatshaw.com/?utm_source=autoresponder&utm_medium=email&utm_campaign=thank_you_email'>
                            <Img
                                style={imgFooter}
                                src={"https://tylerlatshaw.com/static/logo.png"}
                                width={300}
                                alt="codepen"
                                className="pt-8 pb-8"
                            />
                        </Link>
                    </Text>

                    <Text style={unsubscribeFooter}>
                        Don&apos;t want to receieve future updates? Reply with &quot;Unsubscribe&quot; in the subject line.
                    </Text>
                </Container>
            </Tailwind>
        </Body>
    </Html>
);

export default EmailTemplate
    ;

const main = {
    fontFamily: "\"Google Sans\",Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
    fallbackFontFamily: "Verdana",
    backgroundColor: "#505050",
    margin: "0",
};

const imgHeader = {
    margin: "auto",
};

const header = {
    width: "100%",
    backgroundColor: "#191919",
    margin: "0 auto",
    zIndex: "999",
};

const container = {
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "0 auto 16px auto",
    width: "648px",
    maxWidth: "648px",
    position: "relative" as const,
};

const heading = {
    background: "#233441",
    padding: "30px",
    color: "white",
    textAlign: "center" as const,
    fontWeight: "400",
    marginTop: "0",
    marginBottom: "0",
};

const mainSection = {
    margin: "0",
    background: "white",
    padding: "0 24px",
    marginTop: "0",
    marginBottom: "0",
};

const text = {
    fontSize: "16px",
    color: "black",
};

const userMessage = {
    fontSize: "16px",
    color: "black",
    marginLeft: "16px",
};

const alignRight = {
    display: "flex",
    flexDirection: "row-reverse" as const,
    paddingRight: "48px",
};

const alignCenter = {
    textAlign: "center" as const,
};

const signature = {
    width: "80px",
};

const callToAction = {
    marginTop: "24px",
    marginBottom: "24px",
    textAlign: "center" as const,
    background: "#234130",
    color: "white",
    padding: "32px 24px 32px 24px",
    border: "6px solid #191919",
    width: "600px",
};

const ctaHeader = {
    fontSize: "22px",
    margin: "0 0 24px 0",
};

const ctaButton = {
    color: "#fff",
    border: "solid 1px",
    fontSize: "15px",
    lineHeight: "18px",
    cursor: "pointer",
    borderRadius: "4px",
    margin: "8px",
    minWidth: "78px",
    padding: "12px"
};

const disclaimer = {
    backgroundColor: "#696969",
    color: "white",
    textAlign: "center" as const,
    padding: "12px 0 12px 0",
    fontSize: "14px",
    width: "100%",
    maxWidth: "648px",
    margin: "0 0 16px 0",
    marginBottom: "0",
};

const footerLinkSection = {
    background: "#233441",
    textAlign: "center" as const,
    paddingTop: "0",
    fontSize: "14px",
    color: "white",
    marginTop: "0",
    marginBottom: "0",
};

const imgFooter = {
    margin: "auto",
    width: "200px",
};

const unsubscribeFooter = {
    fontSize: "14px",
    textAlign: "center" as const,
    color: "#1a1a1a",
};