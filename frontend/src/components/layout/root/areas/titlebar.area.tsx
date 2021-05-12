import React from 'react';
import {
  GridItem,
  useColorModeValue as mode,
} from '@chakra-ui/react';

/**
 * Layout for 'titlebar' grid template area.
 * Parent of Navbar
 *
 * @see Navbar
 * @since 4.21.21
 */

const TitleBarArea: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <GridItem
      as="header"
      id="main-header"
      gridArea={['titlebar']}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      zIndex={9996}
      display={{ base: 'flex', lg: 'none' }}
      flex={['0 0 auto']}
      height="62px"
      maxHeight="62px"
      bg={mode('#fff', '#141625')}
      borderBottom={['1px solid']}
      borderColor={mode('#d8d9da', '#252945')}
      p={0}
      cursor="default"
    >
      {children}
    </GridItem>
  </>
);

export default TitleBarArea;
