export declare function setWindow(w: any): void;
/**
 * @returns {Window}
 */
export declare function getWindow(): {
    URL: any;
    location: {
        href: string;
        search: string;
    };
    history: {
        pushState: () => void;
    };
    fireEvent: (eventName: any) => void;
    addEventListener: (eventName: any, listener: any) => void;
    removeEventListener: (eventName: any, listener: any) => void;
} | (Window & typeof globalThis);
