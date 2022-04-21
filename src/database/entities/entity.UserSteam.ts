import {Entity, PrimaryColumn, Column} from "typeorm"

@Entity("UserSteam")
export class EntityUserSteam {
    @PrimaryColumn({ name: "id" })
    id!: string

    @Column({ name: "steamID", nullable: false })
    steamID!: string
}
