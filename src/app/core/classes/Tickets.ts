import { EColors, ETicketStatus } from "../enums";

export class TicketsBadges {

    mapTicketsBadges(): { [key in ETicketStatus | any]: { label: string, color: EColors } } {
        return {
            [ETicketStatus.open]: { label: 'enums.ETicketsStatusFilter.1', color: EColors.orange },
            [ETicketStatus.close]: { label: 'enums.ETicketsStatusFilter.2', color: EColors.blue },
        }
    }
}