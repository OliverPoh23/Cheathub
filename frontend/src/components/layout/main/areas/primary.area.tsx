import React from 'react';
import {
  GridItem,
  Flex,
  useColorModeValue as mode,
} from '@chakra-ui/react';

/**
 * Grid layout for 'primary' grid template area.
 * Parent of all content/nodes in primary panel i.e. `Content` section.
 *
 * @see Content
 * @since 4.21.21
 * @example
 * // children
 *   <Content>{children}</Content>
 */

const PrimaryArea: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <GridItem
      id="main-primary"
      as="section"
      gridArea={['primary']}
      gridTemplateRows={['1fr']}
      maxWidth={{ base: '100vw', lg: '968px' }}
      height={{ base: 'calc(100vh - 62px)', lg: '100%' }}
      borderColor={mode('#d8d9da', '#252945')}
      borderLeft={{
        base: '0px',
        lg: mode('1px solid #d8d9da', '1px solid #252945'),
      }}
      borderRight={{
        base: '0px',
        lg: mode('1px solid #d8d9da', '1px solid #252945'),
      }}
      borderBottom={{ base: '0px', lg: '1px solid' }}
      borderRadius={['0px 0px 4px 4px']}
      gridColumnStart={{ base: '1', lg: 'unset' }}
    >
      <Flex flexDirection="column">{children}</Flex>
    </GridItem>
  </>
);

export default PrimaryArea;
