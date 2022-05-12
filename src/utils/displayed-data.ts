export type DisplayedDataType = {
    title: string;
    name: string;
    type: string;
}[];

export const displayedData: DisplayedDataType = [
    {
        title: "Electric field(Ez)",
        name: "Ez",
        type: "Ez",
    },
    {
        title: "Magnetic field(Hy)",
        name: "Hy",
        type: "Hy",
    },
    {
        title: "Electric field(Hx)",
        name: "Hx",
        type: "Hx",
    },
    {
        title: "Energy",
        name: "w",
        type: "Energy",
    },
];