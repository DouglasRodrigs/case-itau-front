import { Directive, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[validatorTooltip]',
  exportAs: 'validatorTooltip'
})
export class ValidatorPasswordTooltipDirective extends MatTooltip implements OnInit {
  ngOnInit(): void {
    super.tooltipClass = 'validator-password-tooltip'; 
  }

  @Input()
  get validatorTooltip() { return this.message; }
  set validatorTooltip(value: string) {
    this.message = this.getMessage(value);
    this.show();
  }
  private getMessage(value: string): string {
    const text = `${this.getTextRoleNumber(this.hasAnyNumber(value))}
    ${this.getTextRoleUpper(this.hasAnyUpper(value))}
    ${this.getTextRoleLower(this.hasAnyLower(value))}
    ${this.getTextRoleSpecial(this.hasAnySpecial(value))}
    ${this.getTextRoleLimit(this.hasLimit(value))}`;
    return text;
  }
  private getTextRoleNumber(showIcon: boolean): string { return `${this.getIcon(showIcon)} - A senha deve conter pelo menos 1 número (0-9)\n` }
  private getIcon(showIcon: boolean): string { return `${showIcon ? '✅' : '❌'}` }
  
  private hasAnyNumber(value: string): boolean { return /[0-9]/.test(value) }
  
  private getTextRoleUpper(showIcon: boolean): string { return `${this.getIcon(showIcon) } - A senha deve conter pelo menos 1 letra maiúscula\n` }
  
  private hasAnyUpper(value: string): boolean { return /[A-Z]/.test(value) }
  
  private getTextRoleLower(showIcon: boolean): string { return `${this.getIcon(showIcon) } - A senha deve conter pelo menos 1 letra minúscula\n` }
  
  private hasAnyLower(value: string): boolean { return /[a-z]/.test(value) }
  
  private getTextRoleSpecial(showIcon: boolean): string { return `${this.getIcon(showIcon) } - A senha deve conter pelo menos 1 caractere especial\n` }
  
  private hasAnySpecial(value: string): boolean { return /[^\w\d\s:]/.test(value) }
  
  private getTextRoleLimit(showIcon: boolean): string { return `${this.getIcon(showIcon)} - A senha deve ter de 8 a 30 caracteres sem espaços\n` }
  
  private hasLimit(value: string): boolean { return /^([^\s]){7,20}$/gm.test(value) }
}