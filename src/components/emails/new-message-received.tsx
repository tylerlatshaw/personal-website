import * as React from "react";

import {
    Body,
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
        <Preview>A new message has been submitted</Preview>
        <Body style={main}>
            <Tailwind>
                <Section style={header}>
                    <Link href='https://tylerlatshaw.com/'>
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
                        <Text style={text}>You have received a new message:</Text>

                        <hr />

                        <Text style={text}><strong>Date: </strong>{props.messageData.dateTime}</Text>
                        <Text style={text}><strong>Name: </strong>{props.messageData.name}</Text>
                        <Text style={text}><strong>Email: </strong>{props.messageData.email}</Text>
                        <Text style={text}><strong>Message: </strong>{props.messageData.message}</Text><br />

                        <Text style={text}><strong>Form Source: </strong>{props.messageData.source}</Text>
                        <Text style={text}><strong>Page: </strong>{props.messageData.referringPage}</Text>
                    </Section>

                    <Text style={footerLinkSection}>
                        <Link href='https://tylerlatshaw.com/'>
                            <Img
                                style={imgFooter}
                                src={"https://tylerlatshaw.com/static/logo.png"}
                                width={300}
                                alt="codepen"
                                className="pt-8 pb-8"
                            />
                        </Link>
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