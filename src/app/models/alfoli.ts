export class Alfoli {
    uid: string;
    Detalle: Array<DetalleAlfoli>;
    Especiales: Array<DetalleAlfoli>;
    Diezmo: number;
    Fecha: Date;
    Nombre: string;
    Iglesia: string;
}

export class DetalleAlfoli {
    Label: string;
    Name: string;
    Value: number;
    Local: boolean;
}