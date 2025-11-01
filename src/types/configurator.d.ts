// types/configurator.ts
export interface Component {
    id: number;
    name: string;
    category: string;
    description?: string;
}

export interface ConfiguratorState {
    step: number;
    busbarType?: string;
    amperage?: number;
    phases?: number;
    components: Component[];
}
