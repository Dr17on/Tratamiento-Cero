class Creditos extends Phaser.Scene {
    constructor() { super({ key: 'Creditos' }); }

    create() {
        const cx = GAME_WIDTH / 2;
        this.cameras.main.setBackgroundColor('#000000');
        
        this.add.text(cx, 150, 'CÓDIGO FÉNIX', { fontSize: '48px', color: '#c0a060', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(cx, 220, 'presenta', { fontSize: '20px', color: '#888888', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);
        this.add.text(cx, 300, 'TRATAMIENTO CERO', { fontSize: '56px', color: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(cx, 370, 'Dos épocas. Una sola voz.', { fontSize: '24px', color: '#aaaaaa', fontFamily: 'Courier New', fontStyle: 'italic' }).setOrigin(0.5);

        this.add.text(cx, 500, 'Gracias por jugar.', { fontSize: '28px', color: '#c0a060', fontFamily: 'Courier New' }).setOrigin(0.5);

        const backBtn = this.add.text(cx, GAME_HEIGHT - 80, 'VOLVER AL MENÚ', { fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New', backgroundColor: '#333333', padding: { x: 20, y: 10 } }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        backBtn.on('pointerup', () => {
            if (this.sound.get('final_giro')) this.sound.stopByKey('final_giro');
            this.scene.start('Menu');
        });
    }
}