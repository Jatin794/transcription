import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Text } from '@mantine/core';

interface RecordingCircleIconProps {}

/**
 * Red circle icon for the record button or to indicate currently recording
 */
const RecordingCircleIcon: React.FunctionComponent<RecordingCircleIconProps> = React.memo(
  function RecordingCircleIcon() {
    return (
      <Text c="red">
        <FontAwesomeIcon icon={faCircle} />
      </Text>
    );
  }
);

export default RecordingCircleIcon;
