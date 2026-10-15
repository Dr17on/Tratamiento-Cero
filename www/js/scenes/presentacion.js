class Presentacion extends Phaser.Scene {
    constructor() {
        super({ key: 'Presentacion' });
    }

    create() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.cameras.main.setBackgroundColor('#000000');

        // ⚠️ FORZAR RESUME
        if (this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }

        this.musica = null;
        if (this.cache.audio.exists('presentacion')) {
            this.musica = this.sound.add('presentacion', {
                loop: true,
                volume: getVolumen() * 0.5
            });
            this.musica.play();
            console.log('▶️ Reproduciendo presentacion');
        }

        this.bgImage = this.add.image(cx, cy, 'presentacion_1')
            .setDisplaySize(GAME_WIDTH, GAME_HEIGHT).setAlpha(0);

        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.55);

        this.texto = this.add.text(cx, cy, '', {
            fontSize: '38px', color: '#e0d8c8',
            fontFamily: 'Courier New', fontStyle: 'italic',
            wordWrap: { width: 900 }, align: 'center',
            stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5).setAlpha(0);

        this.skipText = this.add.text(cx, GAME_HEIGHT - 50, t('presentacion.skip'), {
            fontSize: '20px', color: '#888888', fontFamily: 'Courier New'
        }).setOrigin(0.5).setAlpha(0.6);

        this.input.on('pointerdown', () => this.avanzarSlide());

        this.slides = [
            { texto: t('presentacion.slide1'), img: 'presentacion_1' },
            { texto: t('presentacion.slide2'), img: 'presentacion_2' },
            { texto: t('presentacion.slide3'), img: 'presentacion_3' },
            { texto: t('presentacion.slide4'), img: 'presentacion_4' }
        ];
        this.slideActual = 0;
        this.mostrarSlide();
    }

    mostrarSlide() {
        if (this.slideActual >= this.slides.length) {
            this.terminarPresentacion();
            return;
        }
        const slide = this.slides[this.slideActual];
        this.bgImage.setTexture(slide.img);
        this.bgImage.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
        this.bgImage.setAlpha(0);
        this.texto.setText(slide.texto);
        this.texto.setAlpha(0);

        this.tweens.add({ targets: this.bgImage, alpha: 1, duration: 1200, ease: 'Power2' });
        this.tweens.add({ targets: this.texto, alpha: 1, duration: 1500, delay: 400, ease: 'Power2' });
    }

    avanzarSlide() {
        if (this.slideActual >= this.slides.length) return;
        this.tweens.add({
            targets: [this.texto, this.bgImage], alpha: 0, duration: 500,
            onComplete: () => {
                this.slideActual++;
                if (this.slideActual < this.slides.length) {
                    this.mostrarSlide();
                } else {
                    this.terminarPresentacion();
                }
            }
        });
    }

    terminarPresentacion() {
        localStorage.setItem('tc_intro_vista', 'true');
        if (this.musica) {
            this.tweens.add({ targets: this.musica, volume: 0, duration: 800 });
            this.time.delayedCall(850, () => { if (this.musica) this.musica.stop(); });
        }
        this.cameras.main.fadeOut(800, 0, 0, 0);
        this.time.delayedCall(900, () => this.scene.start('Menu'));
    }
}