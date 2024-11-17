import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from "../../components/base-components/base-button-component/base-button-component.component";
import { BaseLabelComponentComponent } from "../../components/base-components/base-label-component/base-label-component.component";
import { EditorModule } from 'primeng/editor';
@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [TranslateModule, BaseButtonComponentComponent, BaseLabelComponentComponent, EditorModule],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleBlogComponent {

}
