import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Box,
  Text,
  HStack,
  IconButton,
  useMediaQuery,
  useDisclosure,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { GoFileSubmodule } from 'react-icons/go';

import { useProfileData } from '../context/profiledata.context';
import { useCollectionHandler } from '../context/collectionhandler';

import Page from '../containers/default.container';

import { SidePanel } from '../components/shared/drawer';

import {
  AddSnippetButton,
  AddCollectionButton,
  BrandButton,
} from '../components/shared/brand-button';

import CollectionItem from '../components/collections/collection';
import SnippetItem from '../components/collections/snippets';
import LoadSpinner from '../components/shared/spinner';

interface CollectionsProps
  extends RouteComponentProps<{ id: string }> {}

/**
 * Frontend public endpoint that represents an array of snippets from an HTTP get request.
 *
 * @file defines Explore page route
 * @since 2021-04-08
 * @param {any} snippets
 * @param {any} history
 * @param {any} match
 * @param {any}
 * @return {=>}
 */
const Collections: React.FC<CollectionsProps> = ({ match }) => {
  const {
    loadSnippetsData,
    collectionsProfile,
    loadingCollections,
    snippetsProfile,
    loadingSnippets,
    loadFaveSnippets,
    faveSnippets,
  } = useProfileData();

  const {
    selected,
    setSelected,
    selections,
    setSelections,
    selectedId,
    setSelectedId,
  } = useCollectionHandler();

  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidePanelRef = React.useRef<HTMLButtonElement>(null);

  const [
    expandedSnippet,
    setExpandedSnippet,
  ] = React.useState<number>(0);

  const [heading, setHeading] = React.useState<string>(
    'All Snippets'
  );

  const [expanded, setExpanded] = React.useState<number>(0);
  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    if (snippetsProfile) {
      setSelections(snippetsProfile.data);
    }
  }, [snippetsProfile]);

  React.useEffect(() => {
    if (match.params.id === 'faves') {
      setId('faves');
    }
  }, [match.params.id]);

  const secondary = loadingCollections ? (
    <LoadSpinner />
  ) : (
    <>
      {faveSnippets?.data?.map(
        (collection: Collection, index: number) => (
          <CollectionItem
            key={`col-fave-${collection._id}-${index}`}
            id={id}
            index={index - 1}
            collection={collection}
            setExpanded={setExpanded}
            expanded={expanded - 1}
            setSelections={setSelections}
            selectedSnippetId={selectedId}
            setSelectedSnippetId={setSelectedId}
            setExpandedSnippet={setExpandedSnippet}
            setHeading={setHeading}
            setId={setId}
            readonly
          />
        )
      )}
      {collectionsProfile?.data?.map(
        (collection: Collection, index: number) => (
          <CollectionItem
            key={`col-${collection._id}-${index}`}
            id={id}
            index={index + 1}
            collection={collection}
            setExpanded={setExpanded}
            expanded={expanded}
            setSelections={setSelections}
            selectedSnippetId={selectedId}
            setSelectedSnippetId={setSelectedId}
            setExpandedSnippet={setExpandedSnippet}
            setHeading={setHeading}
            setId={setId}
          />
        )
      )}
    </>
  );
  const secondaryHeading = 'Collections';
  const secondaryChildren = (
    <AddCollectionButton> New Collection</AddCollectionButton>
  );
  const secondaryFooterHeading =
    collectionsProfile && collectionsProfile.data.length.toString();
  const primaryHeading = heading;
  const primaryChildren = (
    <HStack>
      {!baseLg && (
        <IconButton
          ref={sidePanelRef}
          onClick={onOpen}
          size="md"
          icon={
            isOpen ? <CloseIcon /> : <Icon as={GoFileSubmodule} />
          }
          aria-label="Open Collections"
        />
      )}
      <Box>
        <Text
          justifySelf="end"
          as="span"
          color="gray.600"
          fontSize="sm"
          mr="10px"
        >
          {selections && selections?.length > 0 ? (
            <>
              {selections.length}{' '}
              {selections.length > 1 ? 'snips' : 'snip'}
            </>
          ) : (
            'Empty'
          )}
        </Text>
      </Box>

      <BrandButton
        onClick={() => {
          loadSnippetsData();
          setHeading('All Snippets');
        }}
      >
        Show all
      </BrandButton>
      {baseLg && <AddSnippetButton>Add New</AddSnippetButton>}
    </HStack>
  );

  const primary = loadingSnippets ? (
    <Box mt="40vh">
      <LoadSpinner />
    </Box>
  ) : (
    selections?.map((snippet: Snippet, index: number) => (
      <SnippetItem
        key={`col-snip-${snippet._id}-${index}`}
        index={index}
        snippet={snippet}
        selectedSnippetId={selectedId}
        setSelectedSnippetId={setSelectedId}
        expandedSnippet={expandedSnippet}
        setExpandedSnippet={setExpandedSnippet}
      />
    ))
  );

  const drawers = (
    <SidePanel
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      buttonRef={sidePanelRef}
      heading={heading}
    >
      {secondary}
    </SidePanel>
  );
  return (
    <>
      <Page
        secondary={baseLg && secondary}
        secondaryHeading={secondaryHeading}
        secondaryChildren={secondaryChildren}
        secondaryFooterHeading={secondaryFooterHeading}
        primary={primary}
        primaryHeading={primaryHeading}
        primaryChildren={primaryChildren}
        drawers={!baseLg && drawers}
      />
    </>
  );
};

export default Collections;
