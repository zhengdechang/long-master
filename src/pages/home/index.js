import React from 'react'
import DicomViewer from "../../components/dicomViewer"


export default function Home() {
    return (
        <div><DicomViewer elementId="home" overlay={true} patientsName='obaba' /></div>
    )
}
