// Packages
import React from 'react';
import {Image} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
// Constants
import {DummyData} from '@/constants/DummyData';
// Components
import {TreeSelect} from '@/components/TreeView';
// Assets
import Assets from 'assets/images/pngs';

jest.useFakeTimers();

describe('Tree View component', () => {
  it('Match Snapshot', () => {
    const {toJSON} = render(<TreeSelect data={DummyData} />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('Match without data Snapshot', () => {
    const {toJSON} = render(
      <TreeSelect onParentPress={() => {}} onChildPress={() => {}} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('Match Snapshot dummy isExpanded data else path', () => {
    const {toJSON} = render(
      <TreeSelect
        data={DummyData}
        onParentPress={() => {}}
        onChildPress={() => {}}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('Match without onPress Snapshot', () => {
    const {toJSON, getByTestId} = render(<TreeSelect data={DummyData} />);
    const buttonGlobal = getByTestId('Phone-parent');
    fireEvent.press(buttonGlobal);
    const buttonParent = getByTestId('Computers-parent');
    fireEvent.press(buttonParent);
    const buttonInnerParent = getByTestId('Watches-parent');
    fireEvent.press(buttonInnerParent);
    expect(toJSON()).toMatchSnapshot();
  });
  it('Match Snapshot When parent styles given', () => {
    const {toJSON} = render(
      <TreeSelect parentContainerStyles={{alignItems: 'center'}} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('Match SnapshotLeft Icon valid JSX', () => {
    const {toJSON} = render(
      <TreeSelect
        renderArrowOpen={<Image source={Assets.ArrowDown} />}
        data={DummyData}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('resolves Parent onPress ', () => {
    const fn = jest.fn();
    const {toJSON, getByTestId} = render(
      <TreeSelect onParentPress={fn} data={DummyData} />,
    );
    const buttonParent = getByTestId('Phone-parent');
    fireEvent.press(buttonParent);
    expect(fn).toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot();
  });
  it('resolves Checkbox onPress ', () => {
    const fn = jest.fn();
    const {toJSON, getByTestId} = render(
      <TreeSelect
        onCheckBoxPress={fn}
        data={DummyData}
        autoSelectParents={false}
      />,
    );
    const buttonParent = getByTestId('Phone-press');
    fireEvent.press(buttonParent);
    DummyData[0].isSelected = true;
    fireEvent.press(buttonParent);
    DummyData[0].isSelected = false;
    expect(fn).toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot();
  });

  it('resolves Parent onPress to expand and unexpand ', () => {
    const fn = jest.fn();
    const {toJSON, getByTestId} = render(
      <TreeSelect onParentPress={fn} data={DummyData} />,
    );
    const buttonParent = getByTestId('Phone-parent');
    fireEvent.press(buttonParent);
    const buttonParentUnExapnd = getByTestId('Phone-parent');
    fireEvent.press(buttonParentUnExapnd);
    expect(fn).toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot();
  });

  it('resolves Child onPress ', () => {
    const fn = jest.fn();
    const childValue = 'data';
    const {toJSON, getByTestId} = render(
      <TreeSelect onParentPress={fn} data={DummyData} childKey={childValue} />,
    );
    const buttonGlobal = getByTestId('Phone-parent');
    fireEvent.press(buttonGlobal);
    const buttonParent = getByTestId('Apple-parent');
    fireEvent.press(buttonParent);
    const buttonInnerParent = getByTestId('Iphone 14-parent');
    fireEvent.press(buttonInnerParent);
    const buttonInnerParentChecked = getByTestId('Iphone 14-press');
    fireEvent.press(buttonInnerParentChecked);
    if (
      DummyData[0][childValue] &&
      DummyData[0][childValue][0] &&
      DummyData[0][childValue][0][childValue] &&
      DummyData[0][childValue][0][childValue][0].isSelected
    ) {
      DummyData[0][childValue][0][childValue][0].isSelected = true;
    }

    fireEvent.press(buttonInnerParentChecked);
    const checkboxParent = getByTestId('Watches-press');
    fireEvent.press(checkboxParent);
    expect(fn).toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot();
  });
});
