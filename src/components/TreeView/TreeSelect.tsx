// Packages
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  cloneDeep,
  isArray,
  isEmpty,
  isNull,
  isString,
  isUndefined,
} from 'lodash';
// Styling
import styles from './styles';
// Types
import type {
  ChildItemTypes,
  CustomImageProps,
  ParentItemTypes,
  TreeDataTypes,
  TreeSelectTypes,
} from 'types/TreeView';
// Hooks
import useTreeSelect from '@/hooks/useTreeSelect';
// Assets
import Assets from 'assets/images/pngs';
import {DummyData} from '@/constants/DummyData';

const CustomImage = ({source, style}: CustomImageProps) => {
  return <Image source={source} style={[styles.iconView, style]} />;
};

const ParentItem = React.memo(
  ({
    item,
    parentContainerStyles,
    parentTextStyles,
    onPressCheckbox,
    showChildren,
    renderIcon,
    titleKey,
    childKey,
    touchableActiveOpacity,
  }: ParentItemTypes) => (
    <View style={styles.renderContainer}>
      <TouchableOpacity
        activeOpacity={touchableActiveOpacity}
        testID={`${item[titleKey]}-parent`}
        onPress={() => showChildren(item)}
        style={parentContainerStyles ?? styles.parentStyles}>
        <TouchableOpacity
          activeOpacity={touchableActiveOpacity}
          testID={`${item[titleKey]}-press`}
          onPress={() => {
            onPressCheckbox(item);
          }}
          style={styles.chevronContainer}>
          {renderIcon(item?.isSelected ?? false, 'child')}
        </TouchableOpacity>
        <Text style={[styles.text, parentTextStyles]}>
          {item[titleKey] as string}
        </Text>
        {Array.isArray(item[childKey]) &&
          (item[childKey] as Array<TreeDataTypes>)?.length > 0 && (
            <View style={styles.chevronContainer}>
              {renderIcon(item?.isExpanded ?? false)}
            </View>
          )}
      </TouchableOpacity>
    </View>
  ),
);

const ChildItem = React.memo(
  ({
    item,
    childContainerStyles,
    childTextStyles,
    onPressCheckbox,
    titleKey,
    onChildPress,
    renderIcon,
    touchableActiveOpacity,
  }: ChildItemTypes) => (
    <TouchableOpacity
      activeOpacity={touchableActiveOpacity}
      testID={`${item[titleKey]}-child`}
      style={[styles.childrenContainerStyles, childContainerStyles]}
      onPress={() => onChildPress(item)}>
      <TouchableOpacity
        activeOpacity={touchableActiveOpacity}
        onPress={() => {
          onPressCheckbox(item);
        }}
        testID={`${item[titleKey]}-press`}
        style={styles.chevronContainer}>
        {renderIcon(item?.isSelected ?? false, 'child')}
      </TouchableOpacity>
      <View style={styles.childTextContainer}>
        <Text style={[styles.text, childTextStyles]}>
          {item[titleKey] as string}
        </Text>
        {item.availability && (
          <Text style={styles.availabilityText}>{item?.availability}</Text>
        )}
      </View>
    </TouchableOpacity>
  ),
);
// Function to extract selected data
const getSelectedData = listData => {
  const selectedData = [];

  const processItems = items => {
    items.forEach(item => {
      if (item.isSelected) {
        selectedData.push(item);
      }
      if (item.data && item.data.length > 0) {
        processItems(item.data);
      }
    });
  };

  processItems(listData);

  return selectedData;
};

const TreeSelect = ({
  leftIconStyles,
  rightIconStyles,
  parentContainerStyles,
  childContainerStyles,
  parentTextStyles,
  childTextStyles,
  touchableActiveOpacity = 0.7,
  data,
  onParentPress = (_value: {}) => {},
  onChildPress = (_value: {}) => {},
  onCheckBoxPress = ([]) => {},
  autoSelectParents = true,
  autoSelectChildren = true,
  autoExpandable = false,
  renderArrowOpen,
  renderArrowClosed,
  renderSelect,
  renderUnSelect,
  titleKey = 'title',
  childKey = 'data',
  flatListProps,
}: TreeSelectTypes) => {
  const [itemChanged, setItemChanged] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const {listData, setListData, refresh, onPressCheckbox, showChildren} =
    useTreeSelect({
      data,
      onCheckBoxPress,
      autoSelectParents,
      autoSelectChildren,
      childKey,
      autoExpandable,
      onParentPress,
      setItemChanged,
    });

  useEffect(() => {
    data && setListData(cloneDeep(data));
  }, [data, setListData]);

  const renderIcon = (
    status: boolean,
    type: string = 'parent',
  ): JSX.Element => {
    const isChild: boolean = type === 'child';
    let selectIcon: {
      custom: JSX.Element | undefined;
      default: ImageSourcePropType;
    };

    if (isChild) {
      selectIcon = status
        ? {custom: renderSelect, default: Assets.CheckboxChecked}
        : {custom: renderUnSelect, default: Assets.CheckboxUnchecked};
    } else {
      selectIcon = status
        ? {custom: renderArrowOpen, default: Assets.ArrowDown}
        : {custom: renderArrowClosed, default: Assets.ArrowRight};
    }

    if (React.isValidElement(selectIcon.custom)) {
      return selectIcon.custom;
    }

    const iconStyle = isChild ? rightIconStyles : leftIconStyles;
    return <CustomImage source={selectIcon.default} style={iconStyle} />;
  };

  // This function renders the tree using a recursive approach, calling itself when children are found.
  const renderTree = ({item}: {item: TreeDataTypes}) => {
    if (isUndefined(item.isExpanded)) {
      item.isExpanded = false;
    }

    if (isUndefined(item.isSelected)) {
      item.isSelected = false;
    }

    const hasTitle = isString(item?.[titleKey]);
    const hasChildren = isArray(item?.[childKey]) && !isEmpty(item[childKey]);

    return (
      <>
        {/* Renders all elements that have children.
            Styling for the parent items is applied here. */}
        {hasTitle && hasChildren && (
          <ParentItem
            {...{
              item,
              parentContainerStyles,
              parentTextStyles,
              onPressCheckbox,
              showChildren,
              renderIcon,
              titleKey,
              childKey,
              touchableActiveOpacity,
            }}
          />
        )}
        {/* Renders all elements that do not have children.
            Styling for the leaf child items is applied here. */}
        {hasTitle && isEmpty(item?.[childKey]) && (
          <ChildItem
            {...{
              item,
              childContainerStyles,
              childTextStyles,
              onPressCheckbox,
              titleKey,
              onChildPress,
              renderIcon,
              touchableActiveOpacity,
            }}
          />
        )}
        {/* Any item with children will invoke the recursive function, causing the FlatList to re-render.
            Styling for the relationship between children and parent is applied here. */}
        {!isNull(item?.[childKey]) && item.isExpanded && (
          <View style={styles.innerContainer}>
            <FlatList
              data={item[childKey] as Array<TreeDataTypes>}
              renderItem={({item: itemName}) => {
                if (!itemName.parent) {
                  itemName.parent = item;
                }
                return renderTree({item: itemName});
              }}
            />
          </View>
        )}
      </>
    );
  };

  // Set selected data into state
  useEffect(() => {
    const selectedData = getSelectedData(listData);
    setSelectedData(selectedData);
    setItemChanged(false);
  }, [listData, itemChanged]); // Trigger whenever listData changes

  const getSelectedVariantsMessage = (
    selectedItems: TreeData[],
    allData: TreeData[],
  ): string => {
    const selectedParents: string[] = [];
    const selectedChildren: string[] = [];

    // Flatten the provided data into an array for easier comparison
    const flattenData = (data: TreeData[]): TreeData[] => {
      return data.reduce((acc: TreeData[], item: TreeData) => {
        acc.push(item);
        if (item.data) {
          acc.push(...flattenData(item.data));
        }
        return acc;
      }, []);
    };

    const flattenedAllData = flattenData(allData);

    // Iterate through selected items and find selected parents and children
    selectedItems.forEach(selectedItem => {
      if (selectedItem.isSelected) {
        if (selectedItem.data) {
          selectedParents.push(selectedItem.title);
        } else {
          selectedChildren.push(selectedItem.title);
        }
      }
    });

    // Check if all children of any parent are selected
    const allChildrenSelectedParents = selectedParents.filter(parentTitle => {
      const parentItem = flattenedAllData.find(
        item => item.title === parentTitle,
      );
      if (parentItem && parentItem.data) {
        const allChildrenSelected = parentItem.data.every(child =>
          selectedChildren.includes(child.title),
        );
        return allChildrenSelected;
      }
      return false;
    });

    // Construct the selected messages based on whether all children of any parent are selected
    const selectedMessages: string[] = selectedParents.map(parentTitle => {
      if (allChildrenSelectedParents.includes(parentTitle)) {
        return `All ${parentTitle}`;
      } else if (selectedChildren.includes(parentTitle)) {
        return `All ${parentTitle}`;
      } else if (selectedParents.includes(parentTitle)) {
        return parentTitle;
      } else {
        return '';
      }
    });

    // If a selected item is the last node, display its name without adding "All"
    const selectedLastNode: string[] = selectedItems
      .filter(selectedItem => selectedItem.isSelected && !selectedItem.data)
      .map(selectedItem => selectedItem.title);

    // Join the selected messages and return
    return [...selectedMessages, ...selectedLastNode]
      .filter(message => message !== '')
      .join(', ');
  };

  return (
    <>
      <FlatList
        data={listData}
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        renderItem={renderTree}
        extraData={refresh}
        keyExtractor={(_item, index) => index.toString()}
        {...flatListProps}
      />
      <Text>{getSelectedVariantsMessage(selectedData, DummyData)}</Text>
    </>
  );
};

export default TreeSelect;
