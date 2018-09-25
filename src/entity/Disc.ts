import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Disc {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    manufacturer: string;

    @Column()
    imgUrl: string;

    @Column()
    plastic: string;

    @Column()
    type: string;

    @Column()
    speed: number;

    @Column()
    glide: number;

    @Column()
    turn: number;

    @Column()
    fade: number;
}
