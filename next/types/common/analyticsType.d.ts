export interface analyticsType {
    labels: string[],
    datasets: analyticsDatasetType[],
}
export interface analyticsDatasetType {
    label: string,
    borderColor: string,
    data: string[],
}