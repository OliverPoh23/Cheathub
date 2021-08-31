import React from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  FormLabel,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  VStack,
  HStack,
  Button,
  IconButton,
  Link,
  Icon,
  useBoolean,
  useClipboard,
  useColorModeValue as mode,
  ButtonGroup,
  useMediaQuery,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, CopyIcon } from '@chakra-ui/icons';
import {
  GoPlus,
  GoPlusSmall,
  GoDash,
  GoLinkExternal,
  GoLink,
  GoPencil,
  GoDiffIgnored,
  GoDiffModified,
} from 'react-icons/go';
import {
  AiFillHeart as FavedIcon,
  AiOutlineHeart as UnfavedIcon,
} from 'react-icons/ai';

import { TimeAgo } from '../../shared/time';
import { MotionUl, MotionLi, MotionP } from '../../shared/motion';

/**
 * Components that represent all items in a Snippet article.
 *
 * CRUD operations begin from this component tree.
 * @file defines body ui for Card Snippet.
 * @date 2021-04-21
 */

/**
 * The description text in a Snippet article.
 *
 * @date 2021-05-10
 */
export const Description: React.FC<{ description: string }> = ({
  description,
}) => (
  <MotionP
    p="10px"
    fontSize="14px"
    fontWeight="thin"
    color={mode('#252945', '#fff')}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    }}
    d="flex"
    alignItems="baseline"
  >
    {description}
  </MotionP>
);

/**
 * The Tag List in a Snippet article.
 *
 * Conditionally renders only 3 tags until representing more tags in a menu portal.
 * @see TagMenu
 *
 * @date 2021-05-10
 */
export const TagList: React.FC<{
  tags: string[];
  editing: boolean;
  collections?: boolean;
  setTags: (value: React.SetStateAction<string>) => void;
}> = ({ tags, editing, collections, setTags }) => (
  <MotionUl listStyleType="none" display="flex">
    {editing
      ? tags.map((tag) => (
          <MotionLi
            key={`form-${tag}`}
            color="gray.600"
            fontSize={{ base: 'xs', lg: 'sm' }}
            cursor="default"
            pr="12px"
            _before={{
              content: `'+ '`,
              fontWeight: 'bold',
            }}
          >
            {tag}
          </MotionLi>
        ))
      : tags.slice(0, 3).map((tag) => (
          <MotionLi
            key={`form-${tag}`}
            color="gray.600"
            fontSize={{ base: 'xs', lg: 'sm' }}
            cursor={collections ? 'default' : 'pointer'}
            pr="12px"
            _before={{
              content: `'+ '`,
              fontWeight: 'bold',
            }}
            _hover={{
              textDecoration: collections ? 'none' : 'underline',
            }}
            onClick={collections ? () => {} : () => setTags(tag)}
          >
            {tag}
          </MotionLi>
        ))}
  </MotionUl>
);

/**
 * The Tag Menu in a Snippet article.
 *
 * Compresses tags in a menu when there are many tags in a row.
 * @see TagMenu
 *
 * @date 2021-05-10
 */
export const TagMenu: React.FC<{
  tags: string[];
  editing: boolean;
  collections?: boolean;
  setTags: (value: React.SetStateAction<string>) => void;
}> = ({ tags, editing, collections, setTags }) => (
  <Menu closeOnSelect={true}>
    {({ isOpen }) => (
      <>
        <MenuButton
          as={Button}
          isActive={isOpen}
          variant="link"
          color="gray.600"
          fontWeight="light"
          fontSize={{ base: 'xs', lg: 'sm' }}
          size="sm"
          leftIcon={
            <Icon fontSize="12px" as={isOpen ? GoDash : GoPlus} />
          }
        >
          All Tags
        </MenuButton>
        <MenuList
          backgroundColor={mode('#f5f2f0', '#252945')}
          borderWidth="1px"
          borderColor={mode('#d8d9da', '#7e88c3')}
          color={mode('#252945', '#fafafa')}
          minWidth="240px"
        >
          {tags.map((tag: string) => (
            <MenuItem
              key={tag}
              value={tag}
              fontSize={{ base: 'xs', lg: 'sm' }}
              disabled={editing || collections}
              onClick={() => setTags(tag)}
              _hover={{
                backgroundColor: mode('#d8d9da', '#7e88c3'),
                color: mode('#0c0e16', '#DFE3FA'),
              }}
            >
              {tag}
            </MenuItem>
          ))}
        </MenuList>
      </>
    )}
  </Menu>
);

/**
 * The User data in a Snippet article.
 *
 * Shows addedBy `name` and addedOn `date`
 * @see TimeAgo
 *
 * @date 2021-05-10
 */
export const PostUserData: React.FC<{
  username: string;
  addedBy: string;
  addedOn: string;
}> = ({ username, addedBy, addedOn }) => (
  <Box
    as="span"
    display={{ base: 'none', sm: 'inline' }}
    _before={{
      content: `': '`,
      fontSize: 'sm',
      fontWeight: 'bold',
    }}
  >
    {addedBy === username ? 'you' : addedBy}
    <Box
      as="span"
      ml="2"
      color="gray.600"
      fontSize={{ base: 'xs', lg: 'sm' }}
      _after={{ content: `'.'` }}
    >
      <TimeAgo date={addedOn} />
    </Box>
  </Box>
);

/**
 * The Post Faves data in a Snippet article.
 *
 * Shows number of `faves` and shows names of `favers` in a Tooltip
 * @see TimeAgo
 *
 * @date 2021-05-10
 */
export const PostFaveData: React.FC<{
  likedBy: string[];
}> = ({ likedBy }) => (
  <Tooltip
    closeDelay={500}
    size="sm"
    variant="outline"
    placement="left-start"
    gutter={20}
    // bg={mode('#f6f6f6', '#f6f6f6')}
    label={
      <VStack as="ul">
        {likedBy.map((like, i) => (
          <Box as="li" fontSize="12px" key={`${i}--${like}`}>
            {like}
          </Box>
        ))}
      </VStack>
    }
  >
    <Box
      as="span"
      ml="2"
      color="gray.600"
      fontSize={{ base: 'xs', lg: 'sm' }}
      _before={{
        content: `'/ '`,
        color: 'blue.400',
        fontWeight: 'bold',
      }}
    >
      {likedBy.length} likes
    </Box>
  </Tooltip>
);

/**
 * The button that links to a snippet's url source.
 *
 * @date 2021-05-10
 */
export const SourceButton: React.FC<{ source: string }> = ({
  source,
}) => {
  const [baseXs, baseSm, baseMd, baseLg] = useMediaQuery([
    '(max-width: 28em)',
    '(min-width: 30em)',
    '(min-width: 58em)',
    '(min-width: 62em)',
  ]);
  return (
    <Button
      display={{ base: 'none', sm: 'flex' }}
      // display="flex"
      // alignItems="center"
      // variant="link"
      variant="outline"
      as={Link}
      size="xs"
      // mr="-px"
      borderColor={mode('#d8d9da', '#7e88c3')}
      color={mode('#252945', '#fafafa')}
      fontWeight="light"
      aria-label="Source"
      href={source}
      target="_blank"
      rel="noreferrer"
      pl={!(baseXs || baseLg) ? '.5rem' : '0px'}
      rightIcon={<Icon fontSize="12px" as={GoLinkExternal} />}
    >
      {!(baseXs || baseLg) && 'Source'}
    </Button>
  );
};

/**
 * The button that links to the edit snippet path.
 *
 * @date 2021-05-10
 */
export const EditButton: React.FC<{
  snipId: string;
  collections?: boolean;
}> = ({ snipId, collections }) => {
  const [baseXs, baseSm, baseMd, baseLg] = useMediaQuery([
    '(max-width: 28em)',
    '(min-width: 30em)',
    '(min-width: 58em)',
    '(min-width: 62em)',
  ]);
  return collections ? (
    <Button
      display="flex"
      // alignItems="center"
      padding="10px"
      justifyContent="space-between"
      variant="outline"
      as={RouterLink}
      fontSize={{ base: 'xs', lg: 'sm' }}
      fontWeight="medium"
      borderColor={mode('#d8d9da', '#7e88c3')}
      color={mode('#252945', '#fafafa')}
      bg={mode('#fff', '#141625')}
      _hover={{
        bg: mode('#f6f6f6', '#252945'),
      }}
      to={`/snippets/${snipId}`}
      rightIcon={<Icon fontSize="10px" as={GoPencil} />}
    >
      Edit this snippet
    </Button>
  ) : (
    <Button
      display="flex"
      justifyContent="space-between"
      variant="outline"
      borderColor={mode('#d8d9da', '#7e88c3')}
      color={mode('#252945', '#fafafa')}
      as={RouterLink}
      size="xs"
      mr="-px"
      ml="8px"
      // TODO apply chakra design system instead of individual assignment
      pl={!(baseXs || baseLg) ? '.5rem' : '0px'}
      fontWeight="light"
      to={`/snippets/${snipId}`}
      rightIcon={<Icon fontSize="10px" as={GoPencil} />}
    >
      {!(baseXs || baseLg) && 'Edit'}
    </Button>
  );
};

/**
 * The button that toggles what a snippet is faved/unfaved.
 *
 * @date 2021-05-10
 */
export const FaveButton: React.FC<{
  faveSnippet?: boolean;
  collections?: boolean;
  snipId: string;
  handleFave?: (snipId: string) => Promise<void>;
  faving: boolean;
  likedBy: string[];
  username: string;
}> = ({
  faveSnippet,
  collections,
  snipId,
  handleFave,
  faving,
  likedBy,
  username,
}) => {
  const [baseXs, baseSm, baseMd, baseLg] = useMediaQuery([
    '(max-width: 28em)',
    '(min-width: 30em)',
    '(min-width: 58em)',
    '(min-width: 62em)',
  ]);

  const [asyncFave, setAsyncFave] = useBoolean();

  React.useEffect(() => {
    if (likedBy.includes(username)) {
      setAsyncFave.on();
    } else {
      setAsyncFave.off();
    }
  }, [likedBy]);

  return collections ? (
    <Button
      type="submit"
      variant="outline"
      padding={{ base: '6px', sm: '10px' }}
      width="100%"
      justifyContent="space-between"
      fontSize={{ base: 'xs', lg: 'sm' }}
      fontWeight="medium"
      bg={mode('#fff', '#141625')}
      _hover={{
        bg: mode('#f6f6f6', '#252945'),
        borderRadius: '6px',
      }}
      rightIcon={
        <Icon
          fontSize="10px"
          color={asyncFave ? '#ff5470' : '#252945'}
          as={asyncFave ? FavedIcon : UnfavedIcon}
        />
      }
      onClick={() => {
        handleFave && handleFave(snipId);
        handleFave && setAsyncFave.toggle();
      }}
    >
      {asyncFave ? 'Remove from favorites' : 'Add to favorites'}
    </Button>
  ) : (
    <Button
      type="submit"
      display="flex"
      justifyContent="space-between"
      variant="outline"
      lineHeight="1"
      fontSize="xs"
      size="xs"
      p={0}
      mr="-px"
      // pl="6px"
      pr="6px"
      ml="8px"
      pl={!(baseXs || baseLg) ? '4px' : '0px'}
      fontWeight="light"
      isLoading={snipId === '' && faving}
      _hover={{
        color: mode('#0c0e16', '#252945'),
        bg: mode('#f5f2f0', '#DFE3FA'),
      }}
      rightIcon={
        <Icon
          fontSize="12px"
          color={asyncFave ? '#ff5470' : '#252945'}
          as={asyncFave ? FavedIcon : UnfavedIcon}
        />
      }
      onClick={() => {
        handleFave && handleFave(snipId);
        handleFave && setAsyncFave.toggle();
      }}
    >
      {!(baseXs || baseLg) && (asyncFave ? 'Unfave' : 'Fave')}
    </Button>
  );
};
