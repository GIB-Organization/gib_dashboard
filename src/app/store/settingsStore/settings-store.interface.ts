import { IGeneralSettings, ISeoSettings } from "../../models";

export interface ISettingsStore{
  generalSettings?: IGeneralSettings,
  seoSettings?: ISeoSettings,
  isProcessing?:boolean,
  isExporting:boolean
}