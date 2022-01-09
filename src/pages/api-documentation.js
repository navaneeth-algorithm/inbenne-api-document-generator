
import React from "react";
import { Container, Row, Col, Form, FormControl, Button } from "react-bootstrap";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { marked } from "marked";
export default function ApiDocumentation() {

    let [formData, setFormData] = useState({})
    let [errorState, setErrorState] = useState({ isError: false, msg: '' })
    let [isNewFile, setFileType] = useState(true);
    let [fileExtensionError, setExtensionError] = useState(false)
    let [responseStatus, setResponseStatus] = useState({ status: "Success", successdata: "", errordata: "", successstatuscode: "HTTP 200 OK", errorstatuscode: "HTTP 500 Internal Server Error" })
    let [responseStatusCode, setResponseStatusCode] = useState("HTTP 200 OK")
    let [selectedRequestMethod, setRequestMethod] = useState("GET")
    let [apiPath, setApiPath] = useState("")
    let [requestbody, setRequestBody] = useState("")
    let [responsebody, setResponseBody] = useState("")
    let [apiDocumentHistory,setApiDocmentHistory]= useState("")
    let [codeTypeRaw,setCodeType] = useState(false)
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
    useEffect(()=>{
        console.log(apiDocumentHistory)
        setFileString(apiDocumentHistory);
    },[apiDocumentHistory])
    const onSubmitButton = () => {
        let apipathformat = `\n### **${apiPath}**`;
        let methodstatusformat = `* ### **Method**:${selectedRequestMethod}`;
        let requestbodyformat = requestbody.length==0?"":`    * ### **Request body**\n    * \`\`\`javascript\n      ${requestbody}\n      \`\`\``;
        let responsesuccessstatuscodeformat = `* ### **success response**\n    * **Statuts:${responseStatus.successstatuscode}**`;
        let successresponse = `   * \`\`\`javascript\n        ${responseStatus.successdata}\n       \`\`\``;
        let responseerrorstatusodeformat = `* ### **error Response**\n    * **Status:${responseStatus.errorstatuscode}**`;
        let errorresponse = `    * \`\`\`javascript\n        ${responseStatus.errordata}\n      \`\`\``;
        //console.log(requestbodyformat)
        let markdowndocument = [
            apipathformat,methodstatusformat,
            requestbodyformat,
            responsesuccessstatuscodeformat,
            successresponse,responseerrorstatusodeformat,errorresponse]
            
        setApiDocmentHistory(apiDocumentHistory.concat(markdowndocument.join("\n")))
        
        
    }
    const statusList = ["HTTP 200 OK",
        "HTTP 201 Created",
        "HTTP 202 Accepted",
        "HTTP 204 No Content",
        "HTTP 304 Not Modified",
        "HTTP 307 Temporary Redirect",
        "HTTP 308 Permanent Redirect",
        "HTTP 400 Bad Request",
        "HTTP 401 Unauthorized",
        "HTTP 403 Forbidden",
        "HTTP 404 Not Found",
        "HTTP 405 Method Not Allowed",
        "HTTP 409 Conflict",
        "HTTP 500 Internal Server Error"
    ]
    const navigate = useNavigate();
    const onSetForm = (field, value) => {
        setFormData({
            ...formData, [field]: value
        })
    }

    const validateFile = (e) => {
        console.log(e.target.files[0]);
        const ext = new String(e.target.files[0].name).split(".").pop();
        if (ext) {

            if (!ext.includes("md")) {
                setExtensionError(true);
            }
            else {
                handleFileChosen(e.target.files[0]);
                setFormData({ ...formData, 'file': e.target.files[0] })
                setExtensionError(false);
            }

        }
    }





    return (
        <div>
            <Row>
                <Col lg={6}>
                    <Container>
                        Here API documentation parameter
                        <Form>
                            <Form.Group>
                                <Form.Check onChange={
                                    (e) => {
                                        onSetForm('filetype', e.target.value)
                                        setFileType(e.target.value == "new file" ? true : false);
                                    }} inline type="radio" name="file-type" label="New File" id="new-file" value="new file" defaultChecked />
                                <Form.Check onChange={(e) => {
                                    onSetForm('filetype', e.target.value);
                                    setFileType(e.target.value == "new file" ? true : false);
                                }} inline type="radio" name="file-type" label="Existing file" id="new-file" value="existing" />
                            </Form.Group>

                            {!isNewFile &&
                                <Row>
                                    <Col><Form.Group>
                                        <Form.Control size="sm" onChange={

                                            (e) => {
                                                onSetForm('file', e.target.files[0]);
                                                validateFile(e);
                                            }} type="file" id="file-upload" label="upload a file" isInvalid={fileExtensionError} />
                                        <Form.Control.Feedback type="invalid">Select .md file</Form.Control.Feedback>

                                    </Form.Group></Col>
                                    <Col>{formData.file && !fileExtensionError &&
                                        <Button onClick={() => {
                                            navigate('/preview-document', { state: { file: formData.file } })
                                        }} size="sm">Preview File</Button>
                                    }</Col>
                                </Row>
                            }
                            <p></p>
                            {!isNewFile && formData.file && !fileExtensionError &&
                                <div>
                                    <Form.Group>
                                        <Form.Control id="apipath" onChange={(e) => {
                                            setApiPath(e.target.value);
                                        }} type="text" placeholder="API path" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>METHOD</Form.Label>
                                        <Form.Select onChange={(e) => {
                                            setRequestMethod(e.target.value);
                                        }}>
                                            <option value="GET">GET</option>
                                            <option value="POST">POST</option>
                                            <option value="PUT">PUT</option>
                                            <option value="UPDATE">UPDATE</option>
                                            <option value="DELETE">DELETE</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Response Status</Form.Label>
                                        <Form.Select onChange={

                                            (e) => {
                                                setResponseStatus({ ...responseStatus, ["status"]: e.target.value });
                                            }
                                        }>
                                            <option value="Success">Success</option>
                                            <option value="Failure">Failure</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select value={responseStatus.status === "Success" ? responseStatus.successstatuscode : responseStatus.errorstatuscode} onChange={(e) => {
                                            if (responseStatus.status === "Success") {
                                                responseStatus.successstatuscode = e.target.value;
                                            }
                                            else {
                                                responseStatus.errorstatuscode = e.target.value;
                                            }
                                            setResponseStatusCode(e.target.value);
                                        }}>
                                            {statusList.map((i) => {
                                                return <option key={i} value={i}>{i}</option>
                                            })}

                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Request in JSON format</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            id="request-data"
                                            onChange={(e) => {
                                                setRequestBody(e.target.value);
                                            }}
                                            placeholder="Request here"
                                            style={{ height: '100px' }}
                                        />
                                    </Form.Group>
                                    <p></p>
                                    <Form.Group>
                                        <Form.Label>{responseStatus.status} Response in JSON format</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            id="response-data"
                                            onChange={(e) => {
                                                if (responseStatus.status === "Success") {
                                                    responseStatus.successdata = e.target.value;
                                                }
                                                else {
                                                    responseStatus.errordata = e.target.value;
                                                }
                                                setResponseBody(e.target.value);
                                            }}
                                            value={
                                                responseStatus.status === "Success" ? responseStatus.successdata : responseStatus.errordata
                                            }
                                            placeholder="Response here"
                                            style={{ height: '100px' }}
                                        />
                                    </Form.Group>
                                    <p></p>
                                    <Form.Group>
                                        <Button onClick={onSubmitButton}>ADD</Button>
                                    </Form.Group>
                                </div>




                            }
                        </Form>

                    </Container>
                </Col>
                <Col lg={6}>
                    <Container style={{ height: '500px', overflow: 'scroll' }}>
                        API Documentation
                        <Form>
                            <Form.Group>
                                <Form.Check onChange={(e)=>{
                                   setCodeType(e.target.value=="raw"?true:false);
                                }} inline type="radio" name="codetype" label="Markdown" value="markdown" defaultChecked/>
                                <Form.Check onChange={(e)=>{
                                   setCodeType(e.target.value=="raw"?true:false);
                                }} inline type="radio" name="codetype" label="Raw" value="raw"/>
                            </Form.Group>
                        </Form>
                        
                        {codeTypeRaw && <div style={{whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={{ __html: fileString }}>
                        </div>}

                        {!codeTypeRaw && <div dangerouslySetInnerHTML={{ __html: marked(fileString) }}>
                        </div>}
                        

                    </Container>
                </Col>
            </Row>

        </div>
    )
}