"use client"

import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import CheckList from '@editorjs/checklist';
import SimpleImage from '@editorjs/simple-image';
import Link from '@editorjs/link';
import Quote from '@editorjs/quote';
import Paragraph from "@editorjs/paragraph";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { File } from '@/types/ideaink';

const documentData = {
    "time": 1550476186479,
    "blocks": [
        {
            "id": "oUq2g_tl8y",
            "type": "header",
            "data": {
                "text": "IdeaInk",
                "level": 2
            }
        },
        {
            "id": "qYIGsjS5rt",
            "type": "header",
            "data": {
                "text": "Tech Stack",
                "level": 4
            }
        },
        {
            "id": "XV87kJS_H1",
            "type": "list",
            "data": {
                "style": "unordered",
                "items": [
                    "Next.js + TypeScript",
                    "Convex",
                    "Editor.js"
                ]
            }
        }
    ],
    "version": "2.8.1"
}

interface IDocumentProps {
    onSaveTrigger: any,
    fileId: any,
    file: File|any
}

function Document({onSaveTrigger, fileId, file}:IDocumentProps) {
    const editorRef = useRef<EditorJS>();
    const [document, setDocument] = useState(documentData);

    // mutation to update document
    const updateDocument = useMutation(api.files.updateDocument);

    const initializeEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs', 
            placeholder: 'Let`s write an awesome story!',
            tools: { 
                header: Header, 
                list: List,
                checklist: CheckList,
                image: SimpleImage,
                link: Link,
                quote: Quote,
                paragraph: Paragraph,
            }, 
            data: file.document ? JSON.parse(file.document) : document
        });
        editorRef.current = editor
    }

    useEffect(() => {
        if(file){
            initializeEditor();
        }
    },[file]);

    // Save document - check the editor.js doc https://editorjs.io/saving-data/
    const handleSaveDocument = () => {
        if(editorRef.current){
            editorRef.current.save().then((outputData) => {
                updateDocument({
                    _id: fileId,
                    document: JSON.stringify(outputData)
                })
                .then((res) => {
                    toast.success('Document saved successfully')
                });
            })
            .catch((error) => {
                toast.error('Error occurred while saving document')
            });
        }
    }

    useEffect(() => {
        if(onSaveTrigger){
            handleSaveDocument();
        }
    },[onSaveTrigger]);

    return (
        <div>
            <div id="editorjs">
            </div>
        </div>
    )
}

export default Document
