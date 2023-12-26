import React, { PropsWithChildren } from 'react';
import { Text } from '@mantine/core';
import './Paragraph.css';

export interface ParagraphProps {}

/**
 * A paragraph with spacing below/after it for body text
 */
const Paragraph: React.FunctionComponent<ParagraphProps> = React.memo(
  (props: PropsWithChildren<ParagraphProps>) => <Text className="Paragraph">{props.children}</Text>
);

export default Paragraph;
