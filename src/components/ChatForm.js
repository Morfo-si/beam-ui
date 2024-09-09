// src/components/ChatForm.js
import React, { useState } from 'react';
import {
  Button,
  TextInput,
  Form,
  FormGroup,
  ActionGroup,
  ExpandableSection,
} from '@patternfly/react-core';
import ReactMarkdown from 'react-markdown';

const ChatForm = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [llm, setLLM] = useState('llama3:latest');
  const [apiUrl, setApiUrl] = useState('http://localhost:8081/api/v1/chat');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleChat = async () => {
    const data = {
      question,
      prompt: customPrompt || undefined,
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResponse(result.response); // Expecting Markdown content from API
    } catch (error) {
      setResponse('Error fetching response: ' + error.message);
    }
  };

  return (
    <Form>
      {/* Markdown-rendered response */}
      <FormGroup label="Response" fieldId="response">
        <div
          style={{
            height: '500px', // Limit the height to approximately 25 lines (you can adjust this)
            overflowY: 'scroll', // Add vertical scrollbar
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
          }}
        >
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </FormGroup>

      {/* Question Input */}
      <FormGroup label="Question" fieldId="question">
        <TextInput
          isRequired
          type="text"
          id="question"
          name="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      </FormGroup>

      {/* Collapsible Section for Advanced Options */}
      <ExpandableSection
        toggleText={isAdvancedOpen ? 'Hide Advanced Options' : 'Show Advanced Options'}
        onToggle={() => setIsAdvancedOpen(!isAdvancedOpen)}
        isExpanded={isAdvancedOpen}
      >
        <FormGroup label="Select LLM" fieldId="llm">
          <TextInput
            isRequired
            type="text"
            id="llm"
            name="llm"
            value={llm}
            onChange={(event) => setLLM(event.target.value)}
          />
        </FormGroup>

        <FormGroup label="API URL" fieldId="apiUrl">
          <TextInput
            isRequired
            type="text"
            id="apiUrl"
            name="apiUrl"
            value={apiUrl}
            onChange={(event) => setApiUrl(event.target.value)}
          />
        </FormGroup>

        <FormGroup label="Custom Prompt" fieldId="customPrompt">
          <TextInput
            type="text"
            id="customPrompt"
            name="customPrompt"
            value={customPrompt}
            onChange={(event) => setCustomPrompt(event.target.value)}
          />
        </FormGroup>
      </ExpandableSection>

      {/* Action Buttons */}
      <ActionGroup>
        <Button variant="primary" onClick={handleChat}>
          Chat
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default ChatForm;