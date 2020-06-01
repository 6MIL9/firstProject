import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
    test('status in props should be in the state', () => {
        const component = create(<ProfileStatus status="test" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test");
    });

    test('span with status must be displayed', () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.length).not.toBeNull();
    });

    test('span must be displayed with correct status', () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('test');
    });

    test("input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    });

    test("input shouldn be displayed in editmode instead of span", () => {
        const component = create(<ProfileStatus status="test" />);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('test');
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn(x => 42 + x);
        const component = create(<ProfileStatus status="test" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});