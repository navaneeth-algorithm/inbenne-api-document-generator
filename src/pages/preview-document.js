import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { Container } from "react-bootstrap";
const PreviewDocument = () => {
    const location = useLocation();
    let fileReader;

    const [fileString, setFileString] = useState("");
    const handleFileRead = (e) => {
        const content = fileReader.result;
        setFileString(content);
    }
    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }
    useEffect(() => {
        handleFileChosen(location.state.file);
    }, [])

    return (
        <Container><div dangerouslySetInnerHTML={{ __html: marked(fileString) }}>

        </div></Container>

    );
}


export default PreviewDocument;