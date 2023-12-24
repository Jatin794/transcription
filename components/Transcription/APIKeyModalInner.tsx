import React, { PropsWithChildren } from 'react';
import {
  Alert,
  Anchor,
  Button,
  Group,
  List,
  Modal,
  PasswordInput,
  Space,
  Text,
} from '@mantine/core';
import { useStateFromProp } from '../hooks/useStateFromProp';
import { useUpdateFromEvent } from '../hooks/useUpdateFromEvent';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';

export interface APIKeyModalInnerProps {
  /** Whether the modal is open */
  opened: boolean;
  onClose: () => unknown;
  apiKey: string;
  onAPIKeyChange: (apiKey: string) => unknown;

  /**
   * Pass true if we opened the API key modal automatically, in which case
   * we'll show an alert about why we need an API key
   */
  showAPIKeyNeededAlert: boolean;
}

/**
 * Modal that lets someone set their API key for transcription
 */
const APIKeyModalInner: React.FunctionComponent<APIKeyModalInnerProps> = React.memo(
  (props: PropsWithChildren<APIKeyModalInnerProps>) => {
    const { opened, onClose: onCloseInternal, onAPIKeyChange, showAPIKeyNeededAlert } = props;
    const [apiKey, setAPIKey] = useStateFromProp(props.apiKey);

    const handleSubmit = useMemoizedCallback((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onAPIKeyChange(apiKey);
    }, []);

    const handleClose = useMemoizedCallback(() => {
      setAPIKey(props.apiKey);
      onCloseInternal();
    }, []);

    return (
      <Modal opened={opened} onClose={handleClose} title="Settings" size="lg">
        <form onSubmit={handleSubmit}>
          {showAPIKeyNeededAlert && (
            <Alert variant="light" mb="md">
              To transcribe audio, we need an OpenAI API key to use the{' '}
              <Anchor
                href="https://platform.openai.com/docs/guides/speech-to-text"
                target="_blank"
                size="sm"
              >
                Whisper Transcription API
              </Anchor>
              .
            </Alert>
          )}
          <PasswordInput
            label="OpenAI API Key"
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={apiKey}
            onChange={useUpdateFromEvent(setAPIKey)}
            formNoValidate
          />

          <Space h="md" />

          <List size="sm">
            <List.Item>
              To get your OpenAI API key, visit{' '}
              <Anchor href="https://platform.openai.com/api-keys" target="_blank" size="sm">
                OpenAI’s website
              </Anchor>
            </List.Item>
            <List.Item>
              The API Key is stored locally on your browser and only sent to OpenAI’s servers.
            </List.Item>
          </List>

          <Space h="md" />

          <Text size="sm">
            To transcribe text, we use OpenAI’s Whisper API, which costs $0.006 per minute (0.6
            cents). You must sign up for an OpenAI API account (not a ChatGPT account) or have an
            API key so that usage gets billed to your account.
          </Text>

          <Space h="md" />

          <Group justify="space-between">
            <Button type="button" variant="default" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>
    );
  }
);

export default APIKeyModalInner;
